(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var EventTarget =
  /*#__PURE__*/
  function () {
    function EventTarget() {
      _classCallCheck(this, EventTarget);

      this.listeners = {};
    }

    _createClass(EventTarget, [{
      key: "addEventListener",
      value: function addEventListener(type, callback) {
        if (!(type in this.listeners)) {
          this.listeners[type] = [];
        }

        this.listeners[type].push(callback);
      }
    }, {
      key: "on",
      value: function on(type, callback) {
        this.addEventListener(type, callback);
        return this;
      }
    }, {
      key: "removeEventListener",
      value: function removeEventListener(type, callback) {
        if (!(type in this.listeners)) {
          return;
        }

        var stack = this.listeners[type];

        for (var i = 0, l = stack.length; i < l; i++) {
          if (stack[i] === callback) {
            stack.splice(i, 1);
            return this.removeEventListener(type, callback);
          }
        }
      }
    }, {
      key: "off",
      value: function off(type, callback) {
        this.removeEventListener(type, callback);
        return this;
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(event) {
        if (!(event.type in this.listeners)) {
          return;
        }

        var stack = this.listeners[event.type];
        Object.defineProperty(event, 'target', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: this
        });

        for (var i = 0, l = stack.length; i < l; i++) {
          stack[i].call(this, event);
        }
      }
    }]);

    return EventTarget;
  }();

  var scanexEventTarget_cjs = EventTarget;

  class Pager extends scanexEventTarget_cjs {
    constructor(container, options) {
      super();
      this._container = container;
      this._options = options || {};
      this._max = this._options.max || 1;
      this._container.innerHTML = `<div class="pager">
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

    get current() {
      return this._current;
    }

    set current(c) {
      if (!isNaN(c) && 1 <= c && c <= this._max) {
        this._current = c;
        this._input.value = this._current.toString();
        let event = document.createEvent('Event');
        event.initEvent('change', false, false);
        event.detail = this._current;
        this.dispatchEvent(event);
      } else {
        this._input.value = this._current.toString();
      }
    }

    forward() {
      this.current += 1;
    }

    back() {
      this.current -= 1;
    }

    start() {
      this.current = 1;
    }

    end() {
      this.current = this._max;
    }

    choose() {
      this.current = parseInt(this._input.value, 10);
    }

  }

  class Grid extends scanexEventTarget_cjs {
    constructor(container, options) {
      super();
      this._container = container;
      this._options = options || {};
      this._container.innerHTML = `<table class="scanex-school grid">
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
            const date = new Date(y, m, d, H, M);
            return date.toLocaleDateString();
          } else {
            return value;
          }
        }
      };
      const pages = this._options.pages || 1;
      this._pager = new Pager(this._footer, {
        max: pages
      });

      this._pager.addEventListener('change', this._onChangePage.bind(this));
    }

    _onChangePage({
      detail
    }) {
      let event = document.createEvent('Event');
      event.initEvent('change', false, false);
      event.detail = detail;
      this.dispatchEvent(event);
    }

    get formatters() {
      return this._formatters;
    }

    set formatters(formatters) {
      this._formatters = formatters;
    }

    get page() {
      return this._pager.current;
    }

    set page(p) {
      this._pager.current = p;
    }

    set items(rows) {
      if (Array.isArray(rows) && rows.length > 0) {
        this._content.innerHTML = `<table>
                <thead>
                    <tr>${this._columns.map(({
        title
      }) => `<th>${title}</th>`).join('')}</tr>
                </thead>
                <tbody>
                ${rows.map((row, i) => {
        return `<tr class="${i % 2 === 0 ? 'odd' : 'even'}">${this._visibleColumns.map((k, j) => {
          const {
            type
          } = this._columns[j];
          const f = this._formatters[type];
          return `<td>${f ? f(row[k]) : row[k]}</td>`;
        }).join('')}</tr>`;
      }).join('')}
                </tbody>
            </table>`;
      } else {
        this._content.innerHTML = '';
      }
    }

    start() {
      this._pager.start();
    }

    forward() {
      this._pager.forward();
    }

    back() {
      this._pager.back();
    }

    end() {
      this._pager.end();
    }

  }

  window.onload = function () {
    const container = document.querySelector('#app');
    const pageSize = 20;
    let options = {
      visibleColumns: ['VesselID', 'ObservationID', 'IcePassage#', 'RecordMSK', 'RecordUTC', 'Visibility'],
      columns: COLUMNS,
      pages: Math.ceil(DB.length / pageSize)
    };
    const grid = new Grid(container, options);
    grid.addEventListener('change', ({
      detail
    }) => {
      const start = (detail - 1) * pageSize;
      const end = detail * pageSize;
      grid.items = DB.slice(start, end);
    });
    grid.start();
  };

}());
//# sourceMappingURL=main.js.map
