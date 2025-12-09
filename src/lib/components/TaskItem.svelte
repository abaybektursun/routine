<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import type { Task } from '$lib/stores/routine.svelte';

	type Props = {
		task: Task;
		checked: boolean;
		onToggle: () => void;
	};

	let { task, checked, onToggle }: Props = $props();
</script>

<Checkbox.Root
	{checked}
	onCheckedChange={onToggle}
	class="flex items-center gap-6 w-full py-4 px-6 cursor-pointer select-none"
>
	<div
		class="w-12 h-12 border-2 border-black flex items-center justify-center shrink-0"
		data-state={checked ? 'checked' : 'unchecked'}
	>
		{#if checked}
			<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
				<polyline points="20 6 9 17 4 12" />
			</svg>
		{/if}
	</div>

	<span class="text-2xl {checked ? 'line-through opacity-50' : ''}">
		{task.label}
		{#if task.duration}
			<span class="text-xl opacity-60">({task.duration})</span>
		{/if}
	</span>
</Checkbox.Root>
