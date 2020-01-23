import Pager from './Pager.js';
import './Grid.css';
import EventTarget from 'scanex-event-target';

class Grid extends EventTarget {
    constructor(container, options) {
        super();
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

        this._formatters = this._options.formatters || {
            'date': value => {
                const rx = /(?<d>\d\d)\/(?<m>\d\d)\/(?<y>\d\d\d\d)\s(?<H>\d\d?):(?<M>\d\d?)/g;
                const match = rx.exec(value);
                if (match && match.groups) {
                    const y = parseInt(match.groups.y, 10);
                    const m = parseInt(match.groups.m, 10) - 1;
                    const d = parseInt(match.groups.d, 10);
                    const H = parseInt(match.groups.H, 10);
                    const M = parseInt(match.groups.M, 10);
                    const date = new Date(y,m,d,H,M);
                    return date.toLocaleDateString();
                }
                else {
                    return value;
                }                
            }
        };

        const pages = this._options.pages || 1;
        this._pager = new Pager(this._footer, {max: pages});
        this._pager.addEventListener('change', this._onChangePage.bind(this));        
    }
    _onChangePage ({detail}) {        
        let event = document.createEvent('Event');
        event.initEvent('change', false, false);
        event.detail = detail;
        this.dispatchEvent(event);
    }
    get formatters () {
        return this._formatters;
    }
    set formatters (formatters) {
        this._formatters = formatters;
    }
    get page () {
        return this._pager.current;
    }
    set page (p) {
        this._pager.current = p;        
    }    
    set items (rows) {
        if (Array.isArray(rows) && rows.length > 0) {            
            this._content.innerHTML = `<table>
                <thead>
                    <tr>${this._columns.map(({title}) => `<th>${title}</th>`).join('')}</tr>
                </thead>
                <tbody>
                ${rows.map((row, i) => {
                    return `<tr class="${i % 2 === 0 ? 'odd' : 'even'}">${this._visibleColumns.map((k,j) => {
                        const {type} = this._columns[j];
                        const f = this._formatters[type];
                        return `<td>${f ? f (row[k]) : row[k]}</td>`;
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