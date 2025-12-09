import routineData from '$lib/data/routine.json';

export type Task = {
	id: string;
	label: string;
	duration?: string;
};

export type RoutineState = {
	date: string;
	completed: string[];
};

function getToday(): string {
	return new Date().toISOString().split('T')[0];
}

function loadState(): RoutineState {
	if (typeof localStorage === 'undefined') {
		return { date: getToday(), completed: [] };
	}

	const stored = localStorage.getItem('routine-state');
	if (!stored) {
		return { date: getToday(), completed: [] };
	}

	const state: RoutineState = JSON.parse(stored);

	// Reset if it's a new day
	if (state.date !== getToday()) {
		return { date: getToday(), completed: [] };
	}

	return state;
}

function saveState(state: RoutineState): void {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('routine-state', JSON.stringify(state));
	}
}

function createRoutineStore() {
	let completed = $state<string[]>(loadState().completed);

	return {
		get tasks(): Task[] {
			return routineData.tasks;
		},

		get title(): string {
			return routineData.title;
		},

		get completed(): string[] {
			return completed;
		},

		get completedCount(): number {
			return completed.length;
		},

		get totalCount(): number {
			return routineData.tasks.length;
		},

		isCompleted(id: string): boolean {
			return completed.includes(id);
		},

		toggle(id: string): void {
			if (completed.includes(id)) {
				completed = completed.filter((c) => c !== id);
			} else {
				completed = [...completed, id];
			}
			saveState({ date: getToday(), completed });
		}
	};
}

export const routine = createRoutineStore();
