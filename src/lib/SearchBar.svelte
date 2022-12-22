<script lang="ts">
    export let search = '';
</script>

<div class="relative mt-3">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
    <input
        type="text"
        placeholder="Search"
        class="w-full py-3 pl-12 pr-4 text-slate-500 border rounded-md outline-none bg-gray-50 focus:text-slate-900 focus:bg-white focus:border-slate-500"
        bind:value={search}
    />
</div>