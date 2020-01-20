var Grid = function(container) {
    this._container = container;
    this._container.innerHTML = '<table class="grid" border="1"></table>';
    this._grid = this._container.querySelector('.grid');
    
    this._fields = DB[0];
    this._data = DB.slice(1);

    this._start_page = 1;
    this._num_records = 25;
    this._sel_data = this._paginate(this._data, this._start_page, this._num_records);

    this._grid.innerHTML = this._set_content(this._fields, this._sel_data);

};

Grid.prototype = {
    _set_headers: function(fields) {
        var tr = '<thead><tr>';
        for (var i = 0; i < 5; i++) {  // fields.length
            tr += '<th>' + fields[i] + '</th>';
        }
        return tr += '</tr></thead>';
    },
    _set_content: function(fields, data) {
        var headers = this._set_headers(fields);
        var content = headers + '<tbody>';
        for (var row = 0; row < data.length; row++) {
            var tr = '<tr>';
            for (var col = 0; col < 5; col++) {  // data[row].length
                tr += '<td>' + data[row][col] + '</td>';
            }
            content += tr + '</tr>';
        }
        return content += '</tbody>';
    },
    _paginate: function(data, start_page, num_records) {
        var start = (start_page - 1) * num_records;
        var end = start_page * num_records;
        return data.slice(start, end);
    }
};

Grid.prototype.constructor = Grid;