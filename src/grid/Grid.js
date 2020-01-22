import Pager from './Pager.js';
import './Grid.css';

class Grid {
    constructor(container, options, onChange) {
        this._container = container;
        this._options = options || {};
    
        this._container.innerHTML = 
            `<table class="scanex-school grid">
                <tr><td class="content"></td></tr>
                <tr><td class="footer"></td></tr>
            </table>`;
    
        this._content = this._container.querySelector('.content');
        this._footer = this._container.querySelector('.footer');
    
        const cks = Object.keys(this._options.columns);
        this._visibleColumns = [];
        this._columns = [];
        for (let i = 0; i < cks.length; ++i) {
            let k = cks[i];
            if (this._options.visibleColumns.indexOf(k) != -1) {
                this._visibleColumns.push(i);
                this._columns.push(this._options.columns[k]);
            }
        }
    
        this._current = 1; // текущая страница
        this._pageSize = this._options.pageSize || 1; // элементов на странице
        this._pages = this._options.pages || 1;
        this._onChange = onChange;
    
        this._pager = new Pager(this._footer, {max: this._pages, current: this._current});
        this._pager.addEventListener('change', e => this.page = e.detail);
    
        this.page = this._current;
    }
    get page () {
        return this._current;
    }
    set page (p) {
        if(!isNaN(p) && 1 <= p && p <= this._pages) {
            this._current = p;
            if (typeof (this._onChange) === 'function') {
                const rows = this._onChange (p, this._pageSize);
                this._render(rows);
            }
        }
    }
    _render (rows) {
        if (Array.isArray(rows) && rows.length > 0) {            
            this._content.innerHTML = `<table>
                <thead>
                    <tr>${this._columns.map(({title}) => `<th>${title}</th>`).join('')}</tr>
                </thead>
                <tbody>
                ${rows.map((row, i) => {
                    return `<tr class="${i % 2 === 0 ? 'odd' : 'even'}">${this._visibleColumns.map(column => {
                        return `<td>${row[column]}</td>`;
                    }).join('')}</tr>`;
                }).join('')}
                </tbody>
            </table>`;
        }
        else {
            this._content.innerHTML = '';
        }
    }
    start() {
        this._pager.start();
    }
    forward () {
        this._pager.forward();
    }
    back () {
        this._pager.back();
    }
    end () {
        this._pager.end();
    }
}

export default Grid;