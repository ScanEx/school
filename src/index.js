import Grid from './grid/Grid.js';
import './icons.css';

window.onload = function () {
    const container = document.querySelector('#app');
    const pageSize = 20;
    let options = {        
        visibleColumns: ['VesselID', 'ObservationID', 'IcePassage#', 'RecordMSK', 'RecordUTC', 'Visibility'],
        columns: COLUMNS,
        pages: Math.ceil (DB.length / pageSize),
    };
    const grid = new Grid(container, options);
    grid.addEventListener('change', ({detail}) => {
        const start = (detail - 1) * pageSize;
        const end = detail * pageSize;
        grid.items = DB.slice(start, end);
    });
    grid.start();
}