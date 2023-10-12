<script>
	export let timeElapsed;
	export let targetTime;

	$: progress = targetTime > 0 ? Math.floor((timeElapsed * 100) / targetTime) : 0;
</script>

<div class="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
	<div class="h-full bg-green-500 rounded-full" style="width: {progress}%" />
	<p class="relative -top-5 text-black">{progress}%</p>
</div>
