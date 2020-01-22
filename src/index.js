import Grid from './grid/Grid.js';
import './icons.css';

// var DB = require ('./db.js');
// var COLUMNS = require('./columns.js');

window.onload = function () {
    const container = document.querySelector('#app');
    const pageSize = 25;
    let options = {        
        visibleColumns: ['VesselID', 'ObservationID', 'IcePassage#', 'RecordMSK', 'RecordUTC'],
        columns: COLUMNS,
        pages: Math.ceil (DB.length / pageSize),
    };        
    new Grid(container, options, index => {
        const start = (index - 1) * pageSize;
        const end = index * pageSize;
        return DB.slice(start, end);
    });
}