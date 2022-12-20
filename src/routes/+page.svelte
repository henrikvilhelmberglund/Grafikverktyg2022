<script>
	import Fa from 'svelte-fa';
	import { faFlag } from '@fortawesome/free-solid-svg-icons';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="middle p-4 [&>*]:text-6xl">
	<Fa icon={faFlag} />
	<Fa icon={faGithub} />
</div>

<style>
	p {
		font-size: 1.5rem;
	}

	.middle {
		width: 300px;
		height: 300px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
