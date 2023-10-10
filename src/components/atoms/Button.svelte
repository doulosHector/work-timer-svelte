<script>
	export let customClass = '';
	export let disabled = '';
	export let disabledMsg = '';
	export let text = '';
</script>

<button
	title={disabled ? disabledMsg : ''}
	class={`px-4 py-2 w-20 text-white rounded ${customClass} ${
		disabled && 'opacity-50 cursor-not-allowed'
	}`}
	{disabled}
	on:click
>
	{text}
</button>
