<script lang="ts">
	import type { WfNodeData } from './types';
    import { node_selected } from './stores';

	export let wf_node: WfNodeData;
	export let node_depth: number = 0;
	export let node_parent: WfNodeData | undefined = undefined;

	/*
    let targets: { [id: string]: string[]; } = {};
    if (node_parent?.edges) {
        for (let x of node_parent.edges) {
            if (!(x.fullname_origin in targets)) {
                targets[x.fullname_origin] = [x.fullname_target];
            } else {
                targets[x.fullname_origin].push(x.fullname_target);
            }
        }
    }

    let self_targets = targets[wf_node.fullname];
*/
    function handleClick() {
        $node_selected = wf_node;
    }
</script>

<div class="hover:bg-sky-700 hover:bg-opacity-20 rounded-md px-2 hover:shadow-md">
	<div class="hover:font-semibold cursor-pointer {$node_selected === wf_node ? 'font-semibold' : ''}" on:click={handleClick}>
		{#if wf_node.type === 'workflow'}
			<span class="text-sky-700 font-bold text-xs">[WF]</span>
		{/if}
		{wf_node.name}
		<!--{#if wf_node.nodes} 
<span class="text-sky-700 font-bold text-xs">({wf_node.nodes.length})</span>
{/if}-->
		<!-- (-> {self_targets ?? '[]'}) -->
	</div>

	{#if wf_node.nodes.length > 0}
		<ul class="list-none pl-8">
			{#each wf_node.nodes as child, idx (child.fullname)}
				<li><svelte:self wf_node={child} node_depth={node_depth + 1} node_parent={wf_node} /></li>
			{/each}
		</ul>
	{/if}
</div>
