<script>
	import { fly } from "svelte/transition";

	// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
</script>

<div
	transition:fly={{ y: 100 }}
	class="fixed bottom-12 left-[35vw] bg-white p-8 rounded-3xl text-xl z-20 border-black border-2 shadow-black shadow-2xl">
	<p>Copied SVG to clipboard! Paste it into Figma 😄</p>
</div>

<style>
</style>
