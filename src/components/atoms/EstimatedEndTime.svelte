<script>
	import dayjs from 'dayjs';

	export let currentTimer;
	export let targetTimeInSeconds;
	export let workTimeElapsedInSeconds;
	export let breakTimeInMinutes;
	export let workTimeInMinutes;

	let addFoodHour = false;
	let targetLeftInSeconds = 0;
	let targetLeftInMinutes = 0;
	let breaksLeft = 0;
	let breakTimeLeftInMinutes = 0;
	let totalTimeLeftInMinutes = 0;
	let estimatedEndTime = 0;

	$: foodHour = addFoodHour ? 60 : 0;

	$: {
		// This reasign estimatedEndTime when currentTimer
		// or foodHour changes to have the most accurate
		// estimatedEndTime
		if (currentTimer || foodHour) {
			targetLeftInSeconds = targetTimeInSeconds - workTimeElapsedInSeconds;
			targetLeftInMinutes = targetLeftInSeconds > 0 ? targetLeftInSeconds / 60 : 0;

			breaksLeft = workTimeInMinutes > 0 ? Math.round(targetLeftInMinutes / workTimeInMinutes) : 0;
			breaksLeft -= currentTimer === 'work' ? 1 : 0;
			breakTimeLeftInMinutes = breaksLeft * breakTimeInMinutes;

			totalTimeLeftInMinutes = Math.round(targetLeftInMinutes + breakTimeLeftInMinutes + foodHour);
			estimatedEndTime = dayjs().add(totalTimeLeftInMinutes, 'minute').format('hh:mm a');
		}
	}
</script>

<p>Est. end time: {estimatedEndTime}</p>
<div>
	<label for="addFoodHour">
		Add food hour
		<input type="checkbox" id="addFoodHour" bind:checked={addFoodHour} />
	</label>
</div>
