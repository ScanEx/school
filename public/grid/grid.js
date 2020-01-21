var Grid = function(container, options, onChange) {
    this._container = container;
    this._options = options || {};

    this._container.innerHTML = 
        '<table class="grid">' +
            '<tr><td class="content"></td></tr>' +
            '<tr><td class="footer"></td></tr>' +
        '</table>';

    this._content = this._container.querySelector('.content');
    this._footer = this._container.querySelector('.footer');

    var cks = Object.keys(this._options.columns);
    this._visibleColumns = [];
    this._columns = [];
    for (var i = 0; i < cks.length; ++i) {
        var k = cks[i];
        if (this._options.visibleColumns.indexOf(k) != -1) {
            this._visibleColumns.push(i);
            this._columns.push(this._options.columns[k]);
        }
    }

    this._current = 1; // текущая страница
    this._pageSize = this._options.pageSize || 1; // элементов на странице
    this._pages = this._options.pages || 1;
    this._onChange = onChange;

    this._pager = new Pager(this._footer, {max: this._pages, current: this._current}, this.setPage.bind(this));

    this.setPage (this._current);
};

Grid.prototype = {
    setPage: function (page) {
        if (typeof (this._onChange) === 'function') {
            var rows = this._onChange (page, this._pageSize);
            this._render(rows);
        }
    },

    _render: function (rows) {
        if (Array.isArray(rows) && rows.length > 0) {
            var t = '<table border=1>';
            t += '<thead><tr>' + this._columns.map(function(c) {
                return '<th>' + c.title + '</th>';
            }).join('') + '</tr></thead>';
            t += '<tbody>';
            for (var i = 0; i < rows.length; ++i) {
                t += '<tr>';
                var cells = rows[i];
                for (var j = 0; j < this._visibleColumns.length; ++j) {
                    var k = this._visibleColumns[j];
                    t += '<td>';
                    t += cells[k];
                    t += '</td>';
                }
                t += '</tr>';
            }
            t += '</tbody>';
            t += '</table>';
            this._content.innerHTML = t;
        }
        else {
            this._content.innerHTML = '';
        }
    },

    start: function() {
        this._pager.start();
    },

    forward: function () {
        this._pager.forward();
    },

    back: function () {
        this._pager.back();
    },

    end: function () {
        this._pager.end();
    }

};

Grid.prototype.constructor = Grid;