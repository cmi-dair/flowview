<script lang="ts">
	import type { WfTree } from '../lib/wftree';
    import { node_selected } from './stores';
    import { keyEventWrap } from './utils';

	export let wf_node: WfTree;

    function handleClick() {
        $node_selected = wf_node;
    }
</script>

<div class="hover:bg-sky-700 hover:bg-opacity-20 rounded-md px-2 hover:shadow-md">
	<div class="hover:font-semibold cursor-pointer {$node_selected === wf_node ? 'font-semibold' : ''}" 
	on:click={handleClick} on:keydown={keyEventWrap(handleClick)}>
		{#if wf_node.data.node.type !== 'node'}
			<span class="text-sky-700 font-bold text-xs">[WF]</span>
		{/if}
		{wf_node.data.node.name}
	</div>

	{#if wf_node.children.length > 0}
		<ul class="list-none pl-8">
			{#each wf_node.children as child, idx}
				<li><svelte:self wf_node={child} /></li>
			{/each}
		</ul>
	{/if}
</div>
