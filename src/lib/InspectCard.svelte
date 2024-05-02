<script lang="ts">
    export let title = '';

    // if true, the height of the card will be determined by the content
    export let free_height: boolean = false;
    export let basis: string = 'basis-1/2';
</script>

<div class="rounded-md border shadow-md p-2 m-2 {basis}">
    <h2 class="font-medium mb-1">{title}</h2>
    <div class="{free_height ? '': 'min-h-40 max-h-80 overflow-auto grow-0 overflow-auto'}">
        <slot/>
    </div>
</div>