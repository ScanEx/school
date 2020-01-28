<script>
    import {afterUpdate} from 'svelte';
    import Pager from './Pager.svelte';
    import './Grid.css';

    export let page;
    export let pages = 1;
    export let rows = [];
    export let status = 'waiting';
    export let columns = {};
    export let visibleColumns = [];    
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

    let _hc;
    let _hr;
    let _cc;
    let _cr;

    afterUpdate(() => {
        if (_hc && _hr && _cc && _cr) {
            const hs = _hr.querySelector('tr');
            const cs = _cr.querySelector('tr');
            for (let i = 0; i < cs.children.length; ++i) {
                const cr = cs.children[i].getBoundingClientRect();
                const hr = hs.children[i].getBoundingClientRect();
                const w = cr.width > hr.width ? cr.width : hr.width;                
                _hc.children[i].style.width = `${w}px`;
                _cc.children[i].style.width = `${w}px`;
            }
        }
    });

</script>

<div class="grid">    
    <div class="header">
        <table cellspacing="0" cellpadding="0">
            <colgroup bind:this="{_hc}">
                {#each _columns as col}
                <col />
                {/each}
            </colgroup>
            <tbody bind:this="{_hr}">
                <tr>                    
                {#each _columns as {title}, i}
                <td>{title}</td>
                {/each}
                </tr>
            </tbody>
        </table>
    </div>        
    {#if Array.isArray(rows) && rows.length > 0}
    <div class="content">        
        <table cellspacing="0" cellpadding="0">
            <colgroup bind:this="{_cc}">
                {#each _columns as col}
                <col />
                {/each}
            </colgroup>
            <tbody bind:this="{_cr}">
                {#each rows as row, i}
                <tr class:odd="{i % 2 === 0}" class:even="{i % 2 !== 0}">
                    {#each _visibleColumns as k, j}
                    {#if typeof _columns[j].style === 'string'}
                    <td style="{_columns[j].style}">{format(row[k], j)}</td>
                    {:else}
                    <td>{format(row[k], j)}</td>
                    {/if}
                    {/each}            
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
    {/if}        
    <div class="footer">
        <i class="status"
        class:check-circle="{status === 'success'}" 
        class:loading="{status === 'waiting'}"
        class:exclamation-circle="{status === 'error'}"
        class:none="{status === 'none'}"></i>
        <Pager bind:current="{page}" bind:max="{pages}" on:change />
    </div>    
</div>