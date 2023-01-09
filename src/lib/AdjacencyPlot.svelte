<script lang="ts">
	import Plotly from './Plotly.svelte';
	import { type WfTree, adjacency_graph } from './wftree';

	export let node: WfTree | undefined;

	let adj_data_plotly: any;
	let adj_data_layout: any;
	$: {
		if (node) {
			adj_data_plotly = adjacency_graph(node);

			Object.assign(adj_data_plotly, {
				type: 'heatmap',
				hoverongaps: false,
				colorscale: [
					[0, '#fff'],
					[0.5, '#888'],
					[1, '#000']
				],
				showscale: false,
				hovertemplate: '%{y}<br>&#8595;<br>%{x}<br>%{z}<extra></extra>' // extra-tag removes trace 0 label
			});
			const nnodes = node.data.node.nodes.length;
			adj_data_plotly = adj_data_plotly;

			const margin_leg = 200;
			const margin_side = 50;
			const margin = margin_leg + margin_side;
			adj_data_layout = {
				autosize: false,
				width: Math.min(20 * nnodes, 800) + margin,
				height: Math.min(20 * nnodes, 800) + margin,
				margin: {
					l: margin_leg,
					r: margin_side,
					b: margin_side,
					t: margin_leg,
					pad: 4
				},
				showlegend: false,
				xaxis: {
					ticks: '',
					side: 'top'
				},
				yaxis: {
					autorange: 'reversed'
				}
			};
		}
	}
</script>

<Plotly data={[adj_data_plotly]} layout={adj_data_layout} config={{ displayModeBar: true }} />
