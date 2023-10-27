<script>
	import { formatTimeWithSeconds } from '../../helpers/formatTime';

	export let targetTimeInSeconds;
	export let timeElapsedInSeconds;

	$: targetLeftInSeconds = targetTimeInSeconds - timeElapsedInSeconds;
</script>

<p>
	Target left: {targetLeftInSeconds > 0 ? formatTimeWithSeconds(targetLeftInSeconds) : '00:00:00'}
</p>
