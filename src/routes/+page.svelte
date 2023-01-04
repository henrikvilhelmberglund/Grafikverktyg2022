<script>
	import Fa from "svelte-fa";
	import { faFlag } from "@fortawesome/free-solid-svg-icons";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
	import Colors from "$lib/Colors.svelte";
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div class="flex flex-row middle p-4 [&>*]:text-6xl">
	<Fa icon={faFlag} />
	<Fa icon={faGithub} />
</div>

<div>
	<Colors />
</div>

<style>
	p {
		font-size: 1.5rem;
	}

	.middle {
		width: 300px;
		height: 300px;
		position: absolute;
		left: 50%;
		top: -10px;
		transform: translateX(-50%);
	}
</style>
