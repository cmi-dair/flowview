<script lang="ts">
	import type { WfEdgeData, WfNodeData } from '../lib/types';
	import WfNode from '../lib/WfNode.svelte';
	import InspectCard from '../lib/InspectCard.svelte';
	import SearchBar from '../lib/SearchBar.svelte';
	import { wf_data, node_selected } from '../lib/stores';
	import { backref_nodes } from '../lib/utils';

	function filter_node(node: WfNodeData, search_str: string): WfNodeData {
		node.nodes = node.nodes.filter((x) => {
			if (x.nodes.length > 0) {
				x.nodes = filter_node(x, search_str).nodes;
				if (x.nodes.length > 0) return true;
			}
			return x.name.toLowerCase().includes(search_str);
		});
		return node;
	}

	function filter_node_copy(node: WfNodeData, search_str: string): WfNodeData {
		if (search_str == '') {
			return node;
		}
		let ret: WfNodeData = structuredClone(node);
		return filter_node(ret, search_str.toLocaleLowerCase());
	}

	function find_parents(node: WfNodeData): WfNodeData[] {
		const ret: WfNodeData[] = [];
		while (node.parent) {
			ret.unshift(node.parent);
			node = node.parent;
		}
		return ret;
	}

	function find_fullname_child(node: WfNodeData, fullname: string): WfNodeData | undefined {
		return node.nodes.find((x) => x.fullname === fullname);
	}

	function find_deps(node: WfNodeData, reverse: boolean = false): WfNodeData[] {
		if (!node.parent) return [];
		const parent = node.parent;
		const edge_dep_t = (x: WfEdgeData) => x.fullname_target;
		const edge_dep_o = (x: WfEdgeData) => x.fullname_origin;

		const edge_dep = reverse ? edge_dep_t : edge_dep_o;
		const edge_dep_r = reverse ? edge_dep_o : edge_dep_t;

		return parent.edges
			.filter((x) => edge_dep_r(x) === node.fullname)
			.map((x) => edge_dep(x))
			.map((x) => find_fullname_child(parent, x))
			.filter((x) => x !== undefined) as WfNodeData[];
	}

	let files: any;

	function on_file_selected(e: Event) {
		if (!e.target) return;
		const file = (e.target as HTMLInputElement)?.files?.[0];
		if (!file) return;
		console.log(file.name);

		const reader = new FileReader();
		reader.onload = (event) => {
			if (!(event.target?.result && typeof event.target.result === 'string')) return;
			const obj = JSON.parse(event.target.result);
			if (obj?.version?.workflow && obj.workflow) {
				console.log('Load workflow:', file.name);
				backref_nodes(obj.workflow);
				$wf_data = obj;
			} else {
				alert('Not a valid workflow file! ' + file.name);
			}
		};
		reader.readAsText(file);
	}

	let search = '';

	$: root_filtered = $wf_data ? filter_node_copy($wf_data.workflow, search) : undefined;
</script>

<div class="container mx-auto flex flex-col h-screen p-0 m-0">
	<div class="text-xl mt-2 flex flex-row">
		<span class="font-medium">&#129497; Workflow explorer</span>
		{#if $wf_data}
			<span class="mx-2">&minus;</span><span class="font-light">{$wf_data?.meta.pipeline_name}</span
			>
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
							{#each find_parents($node_selected) as parent}
								<span
									on:click={() => ($node_selected = parent)}
									class="font-light text-slate-600 hover:text-black hover:font-medium cursor-pointer"
									>{parent.name}</span
								>
								<span class="text-slate-400 mx-2">/</span>
							{/each}
						</div>
						<h2 class="text-xl font-medium">{$node_selected.name}</h2>

						<div class="flex flex-col overflow-auto">
							<InspectCard title="Dependencies">
								{#each find_deps($node_selected) as dep, idx}
									<div
										class="break-after-auto hover:font-medium cursor-pointer"
										on:click={() => ($node_selected = dep)}
									>
										{dep.name}
									</div>
								{/each}
							</InspectCard>

							<InspectCard title="Reverse dependencies">
								{#each find_deps($node_selected, true) as dep, idx}
									<div
										class="break-after-auto hover:font-medium cursor-pointer"
										on:click={() => ($node_selected = dep)}
									>
										{dep.name}
									</div>
								{/each}
							</InspectCard>

							<InspectCard title="Inputs">
								<table class="border-separate border-spacing-x-2">
									<tbody>
										{#each Object.entries($node_selected.inputs) as [key, value], idx (key)}
											<tr class="even:bg-slate-100">
												<td class="font-light">{key}</td>
												<td
													style="white-space: pre-wrap; display: block; max-height: 10rem; overflow: auto;"
												>
													{value}
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</InspectCard>
							<InspectCard title="Outputs">
								<table class="border-separate border-spacing-x-2">
									<tbody>
										{#each Object.entries($node_selected.outputs) as [key, value], idx (key)}
											<tr class="even:bg-slate-100">
												<td class="font-light">{key}</td>
												<td
													style="white-space: pre-wrap; display: block; max-height: 10rem; overflow: auto;"
												>
													{value}
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</InspectCard>
						</div>
					{:else}
						<h2 class="text-3xl text-semibold text-center pt-4">Click on a node!</h2>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
