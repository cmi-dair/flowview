<!-- Based on: https://github.com/aknakos/sveltekit-plotly -->
<script lang="ts">
	import { PlotlyLib } from './stores';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	export let id: string = 'plot-' + Math.floor(Math.random() * 100).toString();
	export let data: Array<Record<string, any>>;
	export let layout: Record<string, any> = {};
	export let config: Record<string, any> = {};
	export let loaded: boolean = false;
	export let reloadPlot = 0;
	function init() {
		if (!$PlotlyLib) $PlotlyLib = (window as any)?.Plotly;
	}
	onMount(async () => init());
	const onHover = (d: any) => dispatch('hover', d);
	const onUnhover = (d: any) => dispatch('unhover', d);
	const onClick = (d: any) => dispatch('click', d);
	const onSelected = (d: any) => dispatch('selected', d);
	const onRelayout = (d: any) => dispatch('relayout', d);
	const generatePlot = (node: any, data: any, layout: any, config: any, reloadPlot: any) => {
		return $PlotlyLib.newPlot(node, data, { ...layout }, { ...config }).then(() => {
			node.on('plotly_hover', onHover);
			node.on('plotly_unhover', onUnhover);
			node.on('plotly_click', onClick);
			node.on('plotly_selected', onSelected);
			node.on('plotly_relayout', onRelayout);
			loaded = true;
		});
	};
	const updatePlot = (node: any, data: any, layout: any, config: any, reloadPlot: any) => {
		return $PlotlyLib.react(node, data, layout, config).then(() => {
			console.debug('update ploty', data);
			loaded = true;
		});
	};
	function plotlyAction(node: any, { data, layout, config, reloadPlot }: Record<any, any>) {
		generatePlot(node, data, layout, config, reloadPlot);
		return {
			update({ data, layout, config }: Record<any, any>) {
				loaded = false;
				updatePlot(node, data, layout, config, reloadPlot);
			},
			destroy() {
				node.removeListener('plotly_hover', onHover);
				node.removeListener('plotly_unhover', onUnhover);
				node.removeListener('plotly_click', onClick);
				node.removeListener('plotly_selected', onSelected);
				node.removeListener('plotly_relayout', onRelayout);
				loaded = false;
			}
		};
	}
</script>

<svelte:head>
	<script src="https://cdn.plot.ly/plotly-2.17.0.min.js" on:load={init}></script>
</svelte:head>
{#if $PlotlyLib}
	<div {id} use:plotlyAction={{ data, layout, config, reloadPlot }} {...$$restProps} />
{:else}
	<slot>Loading Plotly</slot>
{/if}

<style>
	/* Fix plotly toolbar linebreaks */
	:global(.modebar-btn svg) {
		display: inherit;
	}
</style>
