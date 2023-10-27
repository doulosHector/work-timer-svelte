<script>
	import dayjs from 'dayjs';

	export let targetTimeInMinutes;
	export let timeElapsed;
	export let breakTimeInMinutes;
	export let workTime;

	$: targetLeftInMinutes = targetTimeInMinutes - timeElapsed;
	$: breaksLeft = Math.floor(targetLeftInMinutes / workTime) - 1 || 0;
	$: breakTimeLeftInMinutes = breaksLeft * breakTimeInMinutes;
	$: totalTimeLeftInMinutes = targetLeftInMinutes + breakTimeLeftInMinutes;
	$: estimatedEndTime = dayjs().add(totalTimeLeftInMinutes, 'minute').format('HH:mm:ss');
</script>

<p>Estimated end time: {estimatedEndTime}</p>
