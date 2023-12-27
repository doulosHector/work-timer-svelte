<script>
	import dayjs from 'dayjs';

	export let targetTimeInSeconds;
	export let workTimeElapsedInSeconds;
	export let breakTimeInMinutes;
	export let workTimeInMinutes;

	let addFoodHour = false;

	$: foodHour = addFoodHour ? 60 : 0;
	$: targetLeftInSeconds = targetTimeInSeconds - workTimeElapsedInSeconds;
	$: targetLeftInMinutes = targetLeftInSeconds > 0 ? targetLeftInSeconds / 60 : 0;

	$: breaksLeft = workTimeInMinutes > 0 ? Math.round(targetLeftInMinutes / workTimeInMinutes) : 0;
	$: breakTimeLeftInMinutes = breaksLeft * breakTimeInMinutes;

	$: totalTimeLeftInMinutes = Math.round(targetLeftInMinutes + breakTimeLeftInMinutes + foodHour);
	$: estimatedEndTime = dayjs().add(totalTimeLeftInMinutes, 'minute').format('hh:mm a');
</script>

<p>Est. end time: {estimatedEndTime}</p>
<div>
	<label for="addFoodHour">
		Add food hour
		<input type="checkbox" id="addFoodHour" bind:checked={addFoodHour} />
	</label>
</div>
