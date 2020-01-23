import EventTarget from 'scanex-event-target';
import './Pager.css';

class Pager extends EventTarget {
    constructor(container, options) {
        super();
        this._container = container;
        this._options = options || {};
        this._max = this._options.max || 1;        
        this._container.innerHTML =
            `<div class="pager">
                <label>1</label>
                <i class="icon fast-backward"></i>
                <i class="icon backward"></i>
                <input class="current" type="text" value="">
                <i class="icon forward"></i>
                <i class="icon fast-forward"></i>
                <label>${this._max}</label>
            </div>`;
        this._input = this._container.querySelector('.current');
        this._input.addEventListener('change', this.choose.bind(this));

        const buttons = this._container.querySelectorAll('.icon');
        buttons[0].addEventListener('click', this.start.bind(this));
        buttons[1].addEventListener('click', this.back.bind(this));
        buttons[2].addEventListener('click', this.forward.bind(this));
        buttons[3].addEventListener('click', this.end.bind(this));
    }
    get current () {
        return this._current;
    }
    set current (c) {        
        if (!isNaN(c) && 1 <= c && c <= this._max) {
            this._current = c;
            this._input.value = this._current.toString();
            let event = document.createEvent('Event');
            event.initEvent('change', false, false);
            event.detail = this._current;
            this.dispatchEvent(event);
        }
        else {
            this._input.value = this._current.toString();
        }         
    }    
    forward () {        
        this.current += 1;
    }
    back () {
        this.current -= 1;
    }
    start () {
        this.current = 1;        
    }
    end () {
        this.current = this._max;        
    }
    choose () {        
        this.current = parseInt(this._input.value, 10);
    }
}

export default Pager;