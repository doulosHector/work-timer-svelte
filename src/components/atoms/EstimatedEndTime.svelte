<script>
	import dayjs from 'dayjs';

	export let targetTimeInSeconds;
	export let timeElapsedInSeconds;
	export let breakTimeInMinutes;
	export let workTimeInMinutes;

	$: targetLeftInSeconds = targetTimeInSeconds - timeElapsedInSeconds;
	$: targetLeftInMinutes = Math.floor(targetLeftInSeconds / 60);
	$: breaksLeft =
		workTimeInMinutes > 0 ? Math.floor(targetLeftInMinutes / workTimeInMinutes) - 1 : 0;
	$: breakTimeLeftInMinutes = breaksLeft * breakTimeInMinutes;
	$: totalTimeLeftInMinutes = targetLeftInMinutes + breakTimeLeftInMinutes;
	$: estimatedEndTime = dayjs().add(totalTimeLeftInMinutes, 'minute').format('HH:mm:ss');
</script>

<p>Estimated end time: {estimatedEndTime}</p>
