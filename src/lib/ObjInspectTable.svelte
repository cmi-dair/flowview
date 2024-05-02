<script lang="ts">
	export let value: Object = {};
	$: ent = Object.entries(value);
</script>

<table class="border-separate border-spacing-x-2 font-mono">
	<tbody>
		{#each ent as [key, value], idx (key)}
			<tr class="even:bg-slate-100">
				<td class="font-light overflow-auto" style="max-width: 14rem;">{key}</td>
				<td
					class="overflow-auto whitespace-pre-wrap overflow-auto block"
					style="max-height: 10rem;"
				>
					{value}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
