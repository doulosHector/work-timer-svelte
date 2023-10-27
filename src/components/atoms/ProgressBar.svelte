<script>
	export let targetTimeInSeconds;
	export let timeElapsedInSeconds;

	$: progress =
		targetTimeInSeconds > 0 ? Math.floor((timeElapsedInSeconds * 100) / targetTimeInSeconds) : 0;
</script>

<div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
	<div class="h-full bg-green-500 rounded-full" style="width: {progress}%" />
	<p class="relative -top-5 text-black">{progress}%</p>
</div>
