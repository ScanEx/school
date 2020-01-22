import Grid from './grid/Grid.js';
import './icons.css';

// var DB = require ('./db.js');
// var COLUMNS = require('./columns.js');

window.onload = function () {
    const container = document.querySelector('#app');
    let options = {
        pageSize: 25,
        visibleColumns: ['VesselID', 'ObservationID', 'IcePassage#', 'RecordMSK', 'RecordUTC'],
        columns: COLUMNS,
    };
    options.pages = Math.ceil (DB.length / options.pageSize);
    const grid = new Grid(container, options, (index, pageSize) => {
        const start = (index - 1) * pageSize;
        const end = index * pageSize;
        return DB.slice(start, end);
    });
}