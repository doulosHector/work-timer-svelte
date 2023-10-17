<script>
	import { onMount } from 'svelte';
	import RangeInput from '../components/atoms/RangeInput.svelte';
	import TargetLeft from '../components/atoms/TargetLeft.svelte';
	import Timer from '../components/molecules/Timer.svelte';
	import ProgressBar from '../components/atoms/ProgressBar.svelte';

	const favicon = document.getElementById('favicon');

	let targetTime = 0;
	let workTime = 0;
	let restTime = 0;
	let workTimeElapsed = 0;
	let showWorkTimer = true;
	let initialValues;
	let ls;

	onMount(() => {
		if (typeof localStorage !== 'undefined') {
			ls = localStorage;
			initialValues = JSON.parse(localStorage.getItem('initialValues'));
			if (initialValues) {
				targetTime = initialValues.targetTime;
				workTime = initialValues.workTime;
				restTime = initialValues.restTime;
			}
		}
	});

	$: {
		if (ls) {
			initialValues = {
				targetTime,
				workTime,
				restTime
			};
			localStorage.setItem('initialValues', JSON.stringify(initialValues));
		}
	}

	function handleTimerStopped(event) {
		if (showWorkTimer) {
			const timeElapsed = event.detail;
			workTimeElapsed += timeElapsed;
		}
		showWorkTimer = !showWorkTimer;
		favicon.href = showWorkTimer ? '/time_green.png' : '/time_blue.png';
	}
</script>

<main class="flex min-h-screen flex-col items-center justify-between p-12 lg:p-24">
	<div class="container mx-auto py-8">
		<h1 class="text-3xl text-center font-bold">Work Timer</h1>
		<div class="flex flex-col items-center">
			<RangeInput name="Target Time" bind:inputTime={targetTime} maxTime={480} step={10} />
			<RangeInput name="Work Lap Time" bind:inputTime={workTime} maxTime={120} step={10} />
			<RangeInput name="Rest Lap Time" bind:inputTime={restTime} maxTime={30} step={1} />
			{#if showWorkTimer}
				<Timer
					name="Work Timer"
					initialTime={workTime * 60}
					backgroundColor="bg-green-700"
					on:timerStopped={handleTimerStopped}
				/>
			{:else}
				<Timer
					name="Rest Timer"
					initialTime={restTime * 60}
					backgroundColor="bg-sky-700"
					on:timerStopped={handleTimerStopped}
				/>
			{/if}
			<div class="mt-6 space-y-2 text-center w-60">
				<ProgressBar targetTime={targetTime * 60} timeElapsed={workTimeElapsed} />
				<TargetLeft targetTime={targetTime * 60} timeElapsed={workTimeElapsed} />
			</div>
		</div>
	</div>
</main>
