<script lang="ts">
	import type { WfTree } from '../lib/wftree';
	import { node_selected } from './stores';
	import { keyEventWrap } from './utils';

	export let wf_node: WfTree;
	export let tree_type: string = 'upstream';
	export let max_level: number = 3;

	$: fun_children =
		tree_type == 'upstream' ? (x: WfTree) => x.data.input_refs : (x: WfTree) => x.data.output_refs;

	function handleClick() {
		$node_selected = wf_node;
	}
</script>

<div class="hover:bg-sky-700 hover:bg-opacity-20 rounded-md px-2 hover:shadow-md">
	<div
		class="hover:font-semibold cursor-pointer {$node_selected === wf_node ? 'font-semibold' : ''}"
		on:click={handleClick}
		on:keydown={keyEventWrap(handleClick)}
	>
		{#if wf_node.data.node.type !== 'node'}
			<span class="text-sky-700 font-bold text-xs">[WF]</span>
		{/if}
		{wf_node.data.node.name}
	</div>

	{#if Math.min(fun_children(wf_node).length, max_level) > 0}
		<ul class="list-none pl-4">
			{#each fun_children(wf_node) as child, idx}
				<li><svelte:self wf_node={child} {tree_type} max_level={max_level - 1} /></li>
			{/each}
		</ul>
	{/if}
</div>
