var Calculator = function (container) {
    this._container = container;
    this._container.innerHTML = '<table class="calc" border="1">' +
        '<tr>' +
            '<td colspan="4" class="result"></td>' +
        '</tr>' +
        '<tr>' +
            '<td>7</td><td>8</td><td>9</td><td>=</td>' +
        '</tr>' +
        '<tr>' +
            '<td>4</td><td>5</td><td>6</td><td>*</td>' +
        '</tr>' +
        '<tr>' +
            '<td>1</td><td>2</td><td>3</td><td>/</td>' +
        '</tr>' +
        '<tr>' +
            '<td>0</td><td>+</td><td>-</td><td>C</td>' +
        '</tr>' +
    '</table>';
    this._result = this._container.querySelector('.result');
    var coll = this._container.querySelectorAll('td');
    for (var i = 1; i < coll.length; ++i) {
        coll[i].addEventListener('click', this._click.bind(this, i));
    }
    this._left;
    this._right;
    this._op;
    this._allowInput = true;
}

Calculator.prototype = {
    _click: function (i, e) {
        console.log(e, i);
        switch (i) {
            case 1:                
                this._append('7');                                
                break;
            case 2:
                this._append('8');
                break;
            case 3:
                this._append('9');
                break;
            case 4:
                this._right = parseInt(this._result.innerText, 10);
                switch (this._op){
                    case '+':
                        this.add();
                        break;
                    case '-':
                        this.sub();
                        break;
                    case '*':
                        this.mul();
                        break;
                    case '/':
                        this.div();
                        break;
                }
                break;
            case 5:
                this._append('4');
                break;
            case 6:
                this._append('5');
                break;
            case 7:
                this._append('6');
                break;
            case 8:
                this._operation('*');
                break;                
            case 9:
                this._append('1');
                break;
            case 10:
                this._append('2');
                break;
            case 11:
                this._operation('+');
                break;
            case 12:
                this._operation('/');
                break;                            
            case 13:
                this._append('0');
                break;
            case 14:
                this._operation('+');
                break;            
            case 15:
                this._operation('-');
                break;
            case 16:
                this._op = undefined;
                this._result.innerText = '';
                this._left = undefined;
                this._right = undefined;
                break;
        }
    },
    _operation: function (op) {        
        this._left = parseInt(this._result.innerText, 10);
        this._result.innerText = '';
        this._op = op;
    },
    _append: function (v) {
        this._result.innerText = this._result.innerText + v;
    },
    add: function () {
        this._result.innerText = this._left + this._right;
    },
    sub: function () {
        this._result.innerText = this._left - this._right;
    },
    div: function () {
        this._result.innerText = this._left / this._right;
    },
    mul: function () {
        this._result.innerText = this._left * this._right;
    }
};

Calculator.prototype.constructor = Calculator;