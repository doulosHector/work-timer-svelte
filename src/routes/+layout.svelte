<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.800);
		color: theme(colors.gray.300);
	}
</style>
