<script>
	import dayjs from 'dayjs';

	export let targetTimeInSeconds;
	export let timeElapsedInSeconds;
	export let breakTimeInMinutes;
	export let workTimeInMinutes;

	$: targetLeftInSeconds = targetTimeInSeconds - timeElapsedInSeconds;
	$: targetLeftInMinutes = targetLeftInSeconds > 0 ? targetLeftInSeconds / 60 : 0;
	$: breaksLeft = workTimeInMinutes > 0 ? Math.floor(targetLeftInMinutes / workTimeInMinutes) : 0;
	$: breakTimeLeftInMinutes = breaksLeft * breakTimeInMinutes;
	$: totalTimeLeftInMinutes = Math.floor(targetLeftInMinutes + breakTimeLeftInMinutes);
	$: estimatedEndTime = dayjs().add(totalTimeLeftInMinutes, 'minute').format('hh:mm a');
</script>

<p>Est. end time: {estimatedEndTime}</p>
