<script>
	import { formatTimeWithSeconds } from '../../helpers/formatTime';

	export let targetTimeInSeconds;
	export let workTimeElapsed;

	$: targetLeftInSeconds = targetTimeInSeconds - workTimeElapsed;
</script>

<p>
	Target left: {targetLeftInSeconds > 0 ? formatTimeWithSeconds(targetLeftInSeconds) : '00:00:00'}
</p>
