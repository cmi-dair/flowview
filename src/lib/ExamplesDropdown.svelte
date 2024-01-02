<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import { wf_raw, node_selected } from '../lib/stores';
	import { load_workflow } from '../lib/wftree';

	interface Example {
		title: string;
		file: string;
		stage: string;
	}

	interface Examples {
		examples: Example[];
	}

	// load /examples/index.json
	const examples: Promise<Examples> = (async () => {
		const response = await fetch('/examples/index.json');
		const response_json = (await response.json()) as Examples;
		response_json.examples.sort((a, b) => a.title.localeCompare(b.title));
		return response_json;
	})();

	function load_example(example: Example) {
		console.log('Load example:', example);

		fetch(`/examples/files/${example.file}`)
			.then((response) => response.text())
			.then((text) => {
				const wf_new = load_workflow(text);
				if (wf_new) {
					console.log('Load workflow:', example.file);
					$wf_raw = wf_new;
					$node_selected = undefined;
				} else {
					alert('Not a valid workflow file! ' + example.file);
				}
			});
	}

	let toggleDropdown: () => boolean;
</script>

<Dropdown title="Examples" bind:toggle={toggleDropdown}>
	<ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
		{#await examples}
			<li>Loading...</li>
		{:then examples}
			{#each examples.examples as example}
				<li>
					<a
						href="#"
						class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						on:click={() => {
							load_example(example);
							toggleDropdown();
						}}>{example.title}</a
					>
				</li>
			{/each}
		{:catch error}
			<li>Error: {error.message}</li>
		{/await}
	</ul>
</Dropdown>
