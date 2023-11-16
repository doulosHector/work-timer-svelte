<script>
	import { onMount } from 'svelte';
	import RangeInput from '../components/atoms/RangeInput.svelte';
	import TargetLeft from '../components/atoms/TargetLeft.svelte';
	import Timer from '../components/molecules/Timer.svelte';
	import ProgressBar from '../components/atoms/ProgressBar.svelte';
	import EstimatedEndTime from '../components/atoms/EstimatedEndTime.svelte';

	let targetTimeInMinutes = 0;
	let workTimeInMinutes = 0;
	let breakTimeInMinutes = 0;
	let workTimeElapsedInSeconds = 0;
	let breakTimeElapsedInSeconds = 0;
	let showWorkTimer = true;
	let initialValues;
	let ls;

	onMount(() => {
		if (typeof localStorage !== 'undefined') {
			ls = localStorage;
			initialValues = JSON.parse(localStorage.getItem('initialValues'));
			if (initialValues) {
				targetTimeInMinutes = initialValues.targetTimeInMinutes;
				workTimeInMinutes = initialValues.workTimeInMinutes;
				breakTimeInMinutes = initialValues.breakTimeInMinutes;
			}
		}
	});

	$: {
		if (ls) {
			initialValues = {
				targetTimeInMinutes,
				workTimeInMinutes,
				breakTimeInMinutes
			};
			localStorage.setItem('initialValues', JSON.stringify(initialValues));
		}
	}

	$: iconUrl = showWorkTimer ? '/time_green.png' : '/time_blue.png';

	function handleTimerStopped(event) {
		const timeElapsedInSeconds = event.detail;
		if (showWorkTimer) {
			workTimeElapsedInSeconds += timeElapsedInSeconds;
		} else {
			breakTimeElapsedInSeconds += timeElapsedInSeconds;
		}
		showWorkTimer = !showWorkTimer;
	}
</script>

<svelte:head>
	<link rel="icon" href={iconUrl} />
</svelte:head>

<main class="flex min-h-screen flex-col items-center justify-between p-12 lg:p-24">
	<div class="container mx-auto py-8">
		<h1 class="text-3xl text-center font-bold">Work Timer</h1>
		<div class="flex flex-col items-center">
			<RangeInput name="Target Time" bind:inputTime={targetTimeInMinutes} maxTime={480} step={10} />
			<RangeInput name="Work Lap Time" bind:inputTime={workTimeInMinutes} maxTime={120} step={5} />
			<RangeInput name="Break Lap Time" bind:inputTime={breakTimeInMinutes} maxTime={30} step={1} />
			{#if showWorkTimer}
				<Timer
					name="Work Timer"
					initialTimeInSeconds={workTimeInMinutes * 60}
					backgroundColor="bg-green-700"
					iconUrl="/time_green.png"
					on:timerStopped={handleTimerStopped}
				/>
			{:else}
				<Timer
					name="Break Timer"
					initialTimeInSeconds={breakTimeInMinutes * 60}
					backgroundColor="bg-sky-700"
					iconUrl="/time_blue.png"
					on:timerStopped={handleTimerStopped}
				/>
			{/if}
			<div class="mt-6 space-y-2 text-center w-60">
				<ProgressBar
					targetTimeInSeconds={targetTimeInMinutes * 60}
					timeElapsedInSeconds={workTimeElapsedInSeconds}
				/>
				<TargetLeft
					targetTimeInSeconds={targetTimeInMinutes * 60}
					timeElapsedInSeconds={workTimeElapsedInSeconds}
				/>
				<EstimatedEndTime
					{breakTimeInMinutes}
					{workTimeInMinutes}
					{workTimeElapsedInSeconds}
					{breakTimeElapsedInSeconds}
					targetTimeInSeconds={targetTimeInMinutes * 60}
				/>
			</div>
		</div>
	</div>
</main>
