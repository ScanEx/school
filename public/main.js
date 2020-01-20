window.onload = function () {
    var container = document.querySelector('#app');
    var options = {
        pageSize: 25,
        visibleColumns: ['VesselID', 'ObservationID', 'IcePassage#', 'RecordMSK', 'RecordUTC'],
        columns: COLUMNS,        
    };
    options.pages = Math.floor (DB.length / options.pageSize);
    var grid = new Grid(container, options, function (index, pageSize) {
        return DB.slice(index, index + pageSize);
    });
}