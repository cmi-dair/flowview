<script lang="ts">
    export let title = '';
</script>

<div class="rounded-md border shadow-md p-2 m-2">
    <h2 class="font-medium mb-1">{title}</h2>
    <div class="max-h-60 overflow-auto">
        <slot/>
    </div>
</div>