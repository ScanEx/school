import Grid from './grid/Grid.svelte';
import './icons.css';

window.onload = function () {
    const container = document.querySelector('#app');
    const pageSize = 25;
    const grid = new Grid({
        target: container,
        props: {
            visibleColumns: ['VesselID', 'ObservationID', 'IcePassage#', 'RecordMSK', 'RecordUTC', 'Visibility'],
            columns: COLUMNS,
            pages: Math.ceil (DB.length / pageSize),
        }
    });
    grid.$on('change', ({detail}) => {        
        const start = (detail - 1) * pageSize;
        const end = detail * pageSize;
        const rows = DB.slice(start, end);
        grid.$set({rows});
    })
    grid.start();    
}