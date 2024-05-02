<script lang="ts">
	import type { WfData, WfEdgeData, WfNodeData } from '../lib/types';
	import WfNode from '../lib/WfNode.svelte';
	import InspectCard from '../lib/InspectCard.svelte';
	import SearchBar from '../lib/SearchBar.svelte';
	import AdjacencyPlot from '../lib/AdjacencyPlot.svelte';
	import { wf_raw, wf_data, node_selected } from '../lib/stores';
	import { filter_node_copy, load_workflow, count_nodes } from '../lib/wftree';
	import { keyEventWrap } from '../lib/utils';

	import { DateTime } from 'luxon';
	import ObjInspectTable from '$lib/ObjInspectTable.svelte';
	import UpstreamTree from '$lib/UpstreamTree.svelte';
	import ExamplesDropdown from '$lib/ExamplesDropdown.svelte';

	let files: any;
	let max_depth_updownstream = 4;

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
				$node_selected = undefined;
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
		<span class="font-medium">FlowView</span>
		{#if $wf_raw}
			<span class="mx-2">&minus;</span>
			<span class="font-light">{$wf_raw.meta.pipeline_name}</span>
			<span class="mx-2">&minus;</span>
			<span class="font-light">{$wf_raw.meta.stage ?? 'pre'}</span>
			<span class="ml-2 font-light text-sm">({meta_datetime?.toRelative()})</span>
		{/if}

		<div class="flex-1" />

		<ExamplesDropdown />

		<input
			type="file"
			accept=".json"
			on:change={on_file_selected}
			bind:this={files}
			class="text-sm text-grey-500
		 file:mx-5 file:py-2 file:px-6
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

				Nodes: {count_nodes(root_filtered)}
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
							<div class="flex flex-row">
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
							</div>

							<div class="flex flex-row">
								<InspectCard title="Upstream (depth {max_depth_updownstream})">
									<UpstreamTree wf_node={$node_selected} max_level={max_depth_updownstream} />
								</InspectCard>

								<InspectCard title="Downstream (depth {max_depth_updownstream})">
									<UpstreamTree
										wf_node={$node_selected}
										tree_type="downstream"
										max_level={max_depth_updownstream}
									/>
								</InspectCard>
							</div>

							<div class="flex flex-row">
								<InspectCard title="Input Data">
									<ObjInspectTable value={$node_selected.data.node.inputs} />
								</InspectCard>
								<InspectCard title="Output Data">
									<ObjInspectTable value={$node_selected.data.node.outputs} />
								</InspectCard>
							</div>
							{#if $node_selected.data.node.result}
								<div class="flex flex-row">
									<InspectCard title="Result Input Data">
										<ObjInspectTable value={$node_selected.data.node.result.inputs} />
									</InspectCard>
									<InspectCard title="Result Output Data">
										<ObjInspectTable value={$node_selected.data.node.result.outputs} />
									</InspectCard>
								</div>
								<div class="flex flex-row">
									<InspectCard title="Execution">
										<table class="border-separate border-spacing-x-2 font-mono">
											<tbody>
												<tr class="even:bg-slate-100">
													<td class="font-light overflow-auto" style="max-width: 14rem;">WD path</td
													>
													<td
														class="overflow-auto whitespace-pre-wrap overflow-auto block"
														style="max-height: 10rem;"
													>
														{$node_selected.data.node.result.wd_path}
													</td>
												</tr>
												{#if $node_selected.data.node.result.command_txt}
													<tr class="even:bg-slate-100">
														<td class="font-light overflow-auto" style="max-width: 14rem;"
															>Command</td
														>
														<td
															class="overflow-auto whitespace-pre-wrap overflow-auto block"
															style="max-height: 10rem;"
														>
															{$node_selected.data.node.result.command_txt}
														</td>
													</tr>
												{/if}
											</tbody>
										</table>
									</InspectCard>
									<InspectCard title="Runtime info">
										<ObjInspectTable value={$node_selected.data.node.result.runtime_info} />
									</InspectCard>
								</div>
							{/if}
							{#if $node_selected.data.node.type !== 'node'}
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
