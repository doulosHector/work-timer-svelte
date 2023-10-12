<script>
	import { onMount } from 'svelte';
	import RangeInput from '../components/atoms/RangeInput.svelte';
	import TargetLeft from '../components/atoms/TargetLeft.svelte';
	import CountDown from '../components/molecules/CountDown.svelte';

	let targetTime = 0;
	let workTime = 0;
	let restTime = 0;
	let workTimeElapsed = 0;
	let showWorkCountDown = true;
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

	function handleCountDownStopped(event) {
		const timeElapsed = event.detail;
		showWorkCountDown = !showWorkCountDown;
		workTimeElapsed += timeElapsed;
	}
</script>

<main class="flex min-h-screen flex-col items-center justify-between p-12 lg:p-24">
	<div class="container mx-auto py-8">
		<h1 class="text-3xl text-center font-bold">Work Timer</h1>
		<div class="flex flex-col items-center">
			<RangeInput name="Target Time" bind:inputTime={targetTime} maxTime={480} step={10} />
			<RangeInput name="Work Lap Time" bind:inputTime={workTime} maxTime={120} step={10} />
			<RangeInput name="Rest Lap Time" bind:inputTime={restTime} maxTime={30} step={1} />
			{#if showWorkCountDown}
				<CountDown
					name="Work Timer"
					initialTime={workTime * 60}
					backgroundColor="bg-green-700"
					on:countDownStopped={handleCountDownStopped}
				/>
			{:else}
				<CountDown
					name="Rest Timer"
					initialTime={restTime * 60}
					backgroundColor="bg-sky-700"
					on:countDownStopped={handleCountDownStopped}
				/>
			{/if}
			<div class="mt-4">
				<TargetLeft targetTime={targetTime * 60} timeElapsed={workTimeElapsed} />
			</div>
		</div>
	</div>
</main>
