<script>
	import Fa from "svelte-fa";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
	import Colors from "$lib/Colors.svelte";
</script>

<svelte:head>
	<title>Color editing tool</title>
</svelte:head>

<h1 class="text-3xl">Color editing tool</h1>

<div class="absolute p-3 -top-3 right-0 [&>*]:text-4xl">
	<a href="https://github.com/henrikvilhelmberglund/Grafikverktyg2022" aria-label="Github link">
		<Fa icon={faGithub} />
	</a>
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
		height: 30px;
		position: absolute;
		left: 50%;
		top: -10px;
		transform: translateX(-50%);
	}
</style>
