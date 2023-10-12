<script>
	import { formatTime } from '../../helpers/formatTime';
	export let inputTime;
	export let maxTime;
	export let name;
	export let step;
</script>

<div class="flex flex-col mt-4 text-gray-400 w-56">
	<label class="text-center">
		{`${name}: ${formatTime(inputTime)}`}
		<input class="w-full" type="range" {step} max={maxTime} bind:value={inputTime} />
	</label>
</div>
