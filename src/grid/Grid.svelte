<script>
    import Pager from './Pager.svelte';
    import './Grid.css';

    export let page;
    export let pages;
    export let columns = {};
    export let visibleColumns = [];
    export let rows = [];
    export let formatters = {
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

    let _columns = [];
    let _visibleColumns = [];

    $: {
        _columns = [];
        _visibleColumns = [];
        const cks = Object.keys(columns);
        for (let i = 0; i < cks.length; ++i) {
            let k = cks[i];
            if (visibleColumns.indexOf(k) != -1) {
                _visibleColumns.push(i);
                _columns.push(columns[k]);
            }
        }
    }

    function format (value, index) {
        const {type, formatter} = _columns[index];
        const f = formatters[type];                
        return typeof formatter === 'function' ? formatter(value) : typeof f === 'function' ? f(value) : value;
    }

    export function start () {
        page = 1;
    }
    export function backward () {
        --page;        
    }
    export function forward () {
        ++page;        
    }
    export function end () {
        page = pages;
    }

</script>

<table class="grid">
    <tr>
        <td class="content">
            <table>
                <thead>
                    <tr>                    
                    {#each _columns as {title}}
                    <th>{title}</th>
                    {/each}
                    </tr>
                </thead>
                <tbody>                
                {#each rows as row, i}
                <tr class:odd="{i % 2 === 0}" class:even="{i % 2 !== 0}">
                    {#each _visibleColumns as k, j}
                    <td>{format(row[k], j)}</td>
                    {/each}            
                </tr>
                {/each}
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td class="footer">
            <Pager bind:current="{page}" bind:max="{pages}" on:change />
        </td>
    </tr>
</table>