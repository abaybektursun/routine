<script lang="ts">
	import TaskItem from '$lib/components/TaskItem.svelte';
	import { routine } from '$lib/stores/routine.svelte';
</script>

<svelte:head>
	<title>{routine.title}</title>
</svelte:head>

<main class="min-h-screen bg-white text-black font-sans p-8 max-w-2xl mx-auto">
	<header class="mb-8">
		<h1 class="text-3xl font-light tracking-wide">{routine.title}</h1>
	</header>

	<ul class="space-y-2">
		{#each routine.tasks as task (task.id)}
			<li class="border-b border-gray-200 last:border-b-0">
				<TaskItem {task} checked={routine.isCompleted(task.id)} onToggle={() => routine.toggle(task.id)} />
			</li>
		{/each}
	</ul>

	<footer class="mt-12 text-center text-xl opacity-60">
		{routine.completedCount} / {routine.totalCount}
	</footer>
</main>
