import Grid from './grid/Grid.svelte';
import './icons.css';
import './main.css';
import columns from './columns.js';

window.addEventListener('load', () => {

    // register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(registration => {            
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {            
            console.log('ServiceWorker registration failed: ', err);
        });
    }

    // init grid
    const pageSize = 50;
    const container = document.querySelector('#app');    
    const grid = new Grid({
        target: container,
        props: {
            visibleColumns: ['vessel_name','vessel_type', 'callsign', 'flag_country', 'destination', 'eta', 'heading', 'sog', 'cog'],
            columns,                               
        }
    }); 
    grid.$on('change', ({detail}) => {
        const offset = (detail - 1) * pageSize;
        grid.$set ({status: 'waiting'});
        fetch(`/ais/${pageSize}/${offset}`)
        .then(res => res.json())
        .then(({count, rows}) => {
            const items = rows.map(row => {
                return Object.keys(row).map(k => row[k]);
            });            
            grid.$set ({rows: items, pages: Math.ceil (count / pageSize), status: 'success'});
        })
        .catch(e => {
            grid.$set ({status: 'error'});
        });

    });      
    grid.start();    
});