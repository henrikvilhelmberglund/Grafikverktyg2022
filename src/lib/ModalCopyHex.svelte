<script>
	export let modalHex;
	import { fly } from "svelte/transition";

	// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/write
	function setClipboard(text) {
		const type = "text/plain";
		const blob = new Blob([text], { type });
		const data = [new ClipboardItem({ [type]: blob })];

		navigator.clipboard.write(data).then(
			() => {
				/* success */
			},
			() => {
				/* failure */
			}
		);
	}
	setClipboard(modalHex);
</script>

<div
	transition:fly={{ y: 100 }}
	class="fixed bottom-12 left-1/2 bg-white p-8 rounded-3xl text-xl z-20 border-black border-2 shadow-black shadow-2xl">
	<p>
		Copied <span style="color: {modalHex}">{modalHex}</span> to clipboard!
	</p>
</div>

<style>
</style>
