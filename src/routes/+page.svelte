<script lang="ts">
	import type { WfData, WfEdgeData, WfNodeData } from '../lib/types';
	import WfNode from '../lib/WfNode.svelte';
	import InspectCard from '../lib/InspectCard.svelte';
	import SearchBar from '../lib/SearchBar.svelte';
	import AdjacencyPlot from '../lib/AdjacencyPlot.svelte';
	import { wf_raw, wf_data, node_selected } from '../lib/stores';
	import { type WfTree, filter_node_copy, load_workflow } from '../lib/wftree';
	import { keyEventWrap } from '../lib/utils';

	import { DateTime } from 'luxon';
	import ObjInspectTable from '$lib/ObjInspectTable.svelte';

	let files: any;

	function on_file_selected(e: Event) {
		if (!e.target) return;
		const file = (e.target as HTMLInputElement)?.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			if (!(event.target?.result && typeof event.target.result === 'string')) return;
			const wf_new = load_workflow(event.target.result);
			if (wf_new) {
				console.log('Load workflow:', file.name);
				$wf_raw = wf_new;
			} else {
				alert('Not a valid workflow file! ' + file.name);
			}
		};
		reader.readAsText(file);
	}

	let search = '';

	$: root_filtered = $wf_data ? filter_node_copy($wf_data, search) : undefined;
	$: meta_datetime = $wf_raw ? DateTime.fromISO($wf_raw.meta.time) : undefined;
</script>

<div class="flex flex-col h-screen p-0 my-0 mx-2">
	<div class="text-xl mt-2 flex flex-row items-baseline">
		<span class="font-medium">&#129497; FlowView</span>
		{#if $wf_raw}
			<span class="mx-2">&minus;</span>
			<span class="font-light">{$wf_raw.meta.pipeline_name}</span>
			<span class="mx-2">&minus;</span>
			<span class="font-light">{$wf_raw.meta.stage ?? 'pre'}</span>
			<span class="ml-2 font-light text-sm">({meta_datetime?.toRelative()})</span>
		{/if}

		<div class="flex-1" />

		<input
			type="file"
			accept=".json"
			on:change={on_file_selected}
			bind:this={files}
			class="text-sm text-grey-500
		 file:mr-5 file:py-2 file:px-6
		 file:rounded-full file:border-0
		 file:text-sm file:font-medium
		 file:bg-blue-50 file:text-blue-700
		 hover:file:cursor-pointer hover:file:bg-amber-50
		 hover:file:text-amber-700"
		/>
	</div>

	{#if root_filtered}
		<div class="grid grid-cols-6 gap-3 h-full overflow-auto">
			<div class="col-span-2 flex flex-col h-full overflow-auto">
				<SearchBar bind:search />

				<div class="my-2 flex-auto h-full overflow-auto">
					<WfNode wf_node={root_filtered} />
				</div>
			</div>
			<div class="col-span-4 h-full overflow-auto">
				<div class="flex flex-col h-full overflow-auto">
					{#if $node_selected}
						<div>
							{#each $node_selected.find_parents() as parent}
								<span
									on:click={() => ($node_selected = parent)}
									on:keydown={keyEventWrap(() => ($node_selected = parent))}
									class="font-light text-slate-600 hover:text-black hover:font-medium cursor-pointer"
									>{parent.data.node.name}</span
								>
								<span class="text-slate-400 mx-2">/</span>
							{/each}
						</div>
						<h2 class="text-xl font-medium">{$node_selected.data.node.name}</h2>

						<div class="flex flex-col overflow-auto">
							<InspectCard title="Input Nodes">
								{#each $node_selected.data.input_refs as dep, idx}
									<div
										class="break-after-auto hover:font-medium cursor-pointer"
										on:click={() => ($node_selected = dep)}
										on:keydown={keyEventWrap(() => ($node_selected = dep))}
									>
										{dep.data.node.name}
									</div>
								{/each}
							</InspectCard>

							<InspectCard title="Output Nodes">
								{#each $node_selected.data.output_refs as dep, idx}
									<div
										class="break-after-auto hover:font-medium cursor-pointer"
										on:click={() => ($node_selected = dep)}
										on:keydown={keyEventWrap(() => ($node_selected = dep))}
									>
										{dep.data.node.name}
									</div>
								{/each}
							</InspectCard>

							<InspectCard title="Input Data">
								<ObjInspectTable value={$node_selected.data.node.inputs} />
							</InspectCard>
							<InspectCard title="Output Data">
								<ObjInspectTable value={$node_selected.data.node.outputs} />
							</InspectCard>
							{#if $node_selected.data.node.type === 'workflow'}
								<InspectCard title="Adjacency" free_height={true}>
									<AdjacencyPlot node={$node_selected} />
								</InspectCard>
							{/if}
						</div>
					{:else}
						<h2 class="text-3xl text-semibold text-center pt-4">Click on a node!</h2>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
