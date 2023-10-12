<script>
	import { formatTimeWithSeconds } from '../../helpers/formatTime';

	export let targetTime;
	export let timeElapsed;
</script>

<p class="text-gray-400">
	Target left:{' '}
	{targetTime && targetTime - timeElapsed > 0
		? formatTimeWithSeconds(targetTime - timeElapsed)
		: '00:00:00'}
</p>
