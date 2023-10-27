<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import { formatTimeWithSeconds } from '../../helpers/formatTime';
	import Button from '../atoms/Button.svelte';

	export let name;
	export let initialTimeInSeconds;
	export let backgroundColor;

	const dispatch = createEventDispatcher();

	let notifGranted = false;
	let isRunning = false;
	let isCountingUp = false;
	let intervalId;

	onMount(() => {
		if (Notification.permission === 'granted') {
			notifGranted = true;
		}
	});

	$: timeLeftInSeconds = initialTimeInSeconds;

	$: timeElapsedInSeconds = !isCountingUp
		? initialTimeInSeconds - timeLeftInSeconds
		: initialTimeInSeconds + timeLeftInSeconds;

	$: if (timeLeftInSeconds === 0 && isRunning) {
		isCountingUp = true;
		handleInterval();
		if (notifGranted) {
			new Notification(`${name} finished!`);
		}
	}

	function requestNotifPermission() {
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				notifGranted = true;
			}
		});
	}

	function handleInterval() {
		clearInterval(intervalId);
		if (isRunning) {
			if (isCountingUp) {
				intervalId = setInterval(() => {
					timeLeftInSeconds++;
				}, 1000);
			} else {
				intervalId = setInterval(() => {
					timeLeftInSeconds--;
				}, 1000);
			}
		}
	}

	function handleStartBtn() {
		isRunning = !isRunning;
		handleInterval();
		requestNotifPermission();
	}

	function resetTimer(sendTimeElapsed = false) {
		isRunning = false;
		isCountingUp = false;
		handleInterval();
		dispatch('timerStopped', sendTimeElapsed ? timeElapsedInSeconds : 0);
		timeLeftInSeconds = initialTimeInSeconds;
	}
</script>

<svelte:head>
	<title>{name} - {formatTimeWithSeconds(timeLeftInSeconds)}</title>
	{#if isCountingUp}
		<link rel="icon" href="/time_orange.png" />
	{/if}
</svelte:head>

<div class="flex flex-col items-center mt-4">
	<p class="text-gray-400">{name}</p>
	<div
		class={`p-4 mt-2 rounded-lg inline-block w-36 text-center ${
			isCountingUp ? 'bg-yellow-700' : backgroundColor
		}`}
	>
		<p class="text-2xl text-white font-bold">{formatTimeWithSeconds(timeLeftInSeconds)}</p>
	</div>
	<div class="flex space-x-4 mt-4">
		<Button
			customClass="bg-cyan-800 hover:bg-cyan-700"
			text={isRunning ? 'Pause' : 'Start'}
			disabled={initialTimeInSeconds === 0}
			disabledMsg="Please set a time first"
			on:click={handleStartBtn}
		/>
		<Button
			customClass="bg-red-800 hover:bg-red-700"
			text="Stop"
			disabled={!isRunning}
			disabledMsg="Please start the timer first"
			on:click={() => resetTimer(true)}
		/>
		<Button
			customClass="bg-amber-800 hover:bg-amber-700"
			text="Skip"
			on:click={() => resetTimer()}
		/>
	</div>
</div>
