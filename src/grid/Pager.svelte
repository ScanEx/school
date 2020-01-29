<script>
    import './Pager.css';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let max = 0;
    export let current = 0;

    export function start () {
        current = 1;        
    }
    export function backward () {
        --current;        
    }
    export function forward () {
        ++current;        
    }
    export function end () {
        current = max;
    }

    let _current = 0;
    let _max = 0;

    function change({target}) {
        current = parseInt(target.value, 10);
    }

    $: {
        if (Number.isInteger(max) && 1 <= max) {
            _max = max;
        }
        else {
            max = _max;
        }             
        if (Number.isInteger(current) && 1 <= current && current <= max) {
            _current = current;
            dispatch('change', _current);
        }   
        else {
            current = _current;
        }     
    }

</script>

<div class="pager">
    <label>1</label>
    <i class="icon fast-backward" tabindex="-4" on:click|stopPropagation="{start}"></i>
    <i class="icon backward" tabindex="-3" on:click|stopPropagation="{backward}"></i>
    <input class="current" tabindex="-2" aria-label="current" type="text" on:change|stopPropagation="{change}" value="{current}">
    <i class="icon forward" tabindex="-1" on:click|stopPropagation="{forward}"></i>
    <i class="icon fast-forward" tabindex="0" on:click|stopPropagation="{end}"></i>
    <label>{max}</label>
</div>