<script>
	import RangeInput from '../components/atoms/RangeInput.svelte';

	let targetTime = 0;
	let workTime = 0;
	let restTime = 0;
</script>

<main class="flex min-h-screen flex-col items-center justify-between p-12 lg:p-24">
	<div class="container mx-auto py-8">
		<h1 class="text-3xl text-center font-bold">Work Timer</h1>
		<div class="flex flex-col items-center">
			<RangeInput name="Target Time" inputTime={targetTime} maxTime={400} step={10} />
			<RangeInput name="Work Lap Time" inputTime={workTime} maxTime={120} step={10} />
			<RangeInput name="Rest Lap Time" inputTime={restTime} maxTime={30} step={1} />
		</div>
	</div>
</main>
