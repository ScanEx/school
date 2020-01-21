require ('./Pager.css');

var EventTarget = require('scanex-event-target');

var Pager = function (container, options) {
    EventTarget.call(this); // вызов конструктора родительского объекта

    this._container = container;
    this._options = options || {};
    this._max = this._options.max || 1;
    this._current = this._options.current || 1;
        
    this._container.innerHTML =
        '<div class="pager">' +
            '<span class="button">&ll;</span>' +
            '<span class="button">&lt;</span>' +
            '<span><input class="current" type="text" value="' + this._current.toString() + '"></span>' +
            '<span class="button">&gt;</span>' +
            '<span class="button">&gg;</span>' +
        '</div>';
    this._input = this._container.querySelector('.current');
    this._input.addEventListener('change', this.choose.bind(this));

    var buttons = this._container.querySelectorAll('.button');
    buttons[0].addEventListener('click', this.start.bind(this));
    buttons[1].addEventListener('click', this.back.bind(this));
    buttons[2].addEventListener('click', this.forward.bind(this));
    buttons[3].addEventListener('click', this.end.bind(this));    
}

Pager.prototype = Object.create(EventTarget.prototype);

Pager.prototype.constructor = Pager;

Pager.prototype._change = function() {
    let event = document.createEvent('Event');
    event.initEvent('change', false, false);
    event.detail = this._current;
    this.dispatchEvent(event);
};

Pager.prototype.forward = function () {
    this._current = this._current + 1 < this._max ? this._current + 1 : this._max;
    this._input.value = this._current.toString();    
    this._change();
};
Pager.prototype.back = function () {
    this._current = this._current - 1 > 0 ? this._current - 1 : 1;
    this._input.value = this._current.toString();
    this._change();
};
Pager.prototype.start = function() {
    this._current = 1;
    this._input.value = this._current.toString();
    this._change();    
};
Pager.prototype.end = function () {
    this._current = this._max;
    this._input.value = this._current.toString();
    this._change();
};
Pager.prototype.choose = function () {
    var input = Number(this._input.value);
    if (!isNaN(input) && input > 0 && input <= this._max) {
        this._current = input;
    } else {
        this._input.value = this._current.toString();
    }
    this._change();
};

module.exports = Pager;