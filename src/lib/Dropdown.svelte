<script lang="ts">
	export let title = 'Dropdown';
	let expanded = false;
	export const toggle = () => (expanded = !expanded);
</script>

<div>
	<button
		id="dropdownDefaultButton"
		on:click={toggle}
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		type="button"
		>{title}
		<svg
			class="w-2.5 h-2.5 ms-3"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 10 6"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="m1 1 4 4 4-4"
			/>
		</svg>
	</button>

	<!-- Dropdown menu -->
	<div
		id="dropdown"
		class:hidden={!expanded}
		class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
	>
		<slot />
	</div>
</div>
