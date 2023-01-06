<script>
	import { allColors } from "$lib/stores.js";
	import ModalCopyHex from "./ModalCopyHex.svelte";
	import ModalCopySVG from "./ModalCopySVG.svelte";
	import { toHSL, toHex } from "$lib/colorConvert.js";
	import { ntc } from "$lib/ntc.js";
	export let colors;
	export let originalColors;
	export let colorIndex;
	export let childColorOutput;
	let showModalHex = false;
	let showModalSVG = false;
	let modalHex;
	let colorToMatch = colors.join().split(" ")[4];
	let matched = ntc.name(colorToMatch)[1];
	let matchedHex = ntc.name(colorToMatch)[0].toLowerCase();
	// console.log(matchedHex);
	let editedColors = colors;
	let userInput = colors;
	$: hueShift = 0;
	$: saturationShift = 0;
	$: lightnessShift = 0;

	function addHSLShift(colorString) {
		let splitColorString = colorString[0].split(" ");
		let changedColors = "";
		splitColorString.forEach((color, i) => {
			let hsl = toHSL(color);
			let split = hsl.split("(")[1];
			let hueNew = hsl.split("(")[1];
			let saturation = split.split(",")[1].split("%")[0];
			let lightness = split.split(",")[2].split("%")[0];
			hueNew = +hueNew.split(",")[0];
			hueNew += +hueShift;
			saturation = +saturation;
			lightness = +lightness;
			saturation += +saturationShift;
			lightness += +lightnessShift;
			// console.log(hueNew);
			if (hueNew < 0) {
				hueNew += 360;
			}
			if (hueNew >= 360) {
				hueNew -= 360;
			}
			if (saturation < 0) {
				saturation = 0;
			}
			if (saturation >= 100) {
				saturation = 100;
			}
			if (lightness < 0) {
				lightness = 0;
			}
			if (lightness >= 100) {
				lightness = 100;
			}

			let hex = toHex(hueNew, saturation, lightness);
			if (i < 9) {
				changedColors += hex + " ";
			} else {
				changedColors += hex;
			}
		});
		let outputArray = [];
		outputArray.push(changedColors);
		colorToMatch = outputArray.join().split(" ")[4];
		matchedHex = ntc.name(colorToMatch)[0].toLowerCase();
		matched = ntc.name(colorToMatch)[1];
		return outputArray;
	}
	function log() {
		console.log(colors);
		console.log(editedColors);
		console.log(userInput);
	}
	function copyHex(i) {
		modalHex = editedColors[0].split(" ")[i];
		console.log(editedColors[0].split(" ")[i]);
		showModalHex = true;
		setTimeout(() => {
			showModalHex = false;
		}, 1000);
	}
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
	// $allColors[colorIndex] = { [matched]: editedColors };
	function updateStore() {
		$allColors[colorIndex] = { [matched]: editedColors };
	}
	function outputSVGString() {
		let SVGString = `<svg width="1000" height="100" viewBox="0 0 1000 100" fill="none" xmlns="http://www.w3.org/2000/svg">`;
		let rectString = [];
		editedColors.forEach((hexes) => {
			hexes = hexes.split(" ");
			hexes.forEach((hex, i) => {
				rectString.push(
					`\n    <rect id="${
						i === 0 ? matched + "/50" : matched + "/" + i * 100
					}" width="100" height="100" fill="${hex}" x="${i * 100}" y="0"/>`
				);
			});
		});
		rectString.reverse();
		SVGString += rectString.join("");
		SVGString += "\n</svg>";
		setClipboard(SVGString);
		showModalSVG = true;
		setTimeout(() => {
			showModalSVG = false;
		}, 1000);
	}
</script>

{colorIndex}
<main class="flex">
	<article
		class="flex flex-col items-center p-4 pb-0 bg-slate-50 m-4 w-[52vw] rounded-lg shadow-black drop-shadow-xl">
		<div class="[&>*]:text-center">
			<p>Current colors:</p>
			<p>
				{editedColors}
			</p>
			<label>
				<input
					type="text"
					id="userInput"
					bind:value={userInput}
					on:input={() => {
						editedColors = Array(userInput);
						editedColors = addHSLShift(editedColors);
						updateStore();
					}}
					class="w-[34vw] text-center border-black border-2 rounded-lg w-[52vw]" />
			</label>
		</div>
		<div class="flex">
			<div class="flex flex-col w-[12vw] [&>*]:h-12 p-4 pt-7">
				<p>Hue shift:</p>
				<p>Saturation shift:</p>
				<p>Lightness shift:</p>
			</div>
			<div class="flex flex-col w-[40vw] p-4 ">
				<input
					type="range"
					class="h-12"
					bind:value={hueShift}
					on:input={(e) => {
						editedColors = addHSLShift(colors);
						console.log(e);
					}}
					on:mouseup={() => updateStore()}
					min="-180"
					max="180" />
				<input
					type="range"
					class="h-12"
					bind:value={saturationShift}
					on:input={() => {
						editedColors = addHSLShift(colors);
					}}
					on:mouseup={() => updateStore()}
					min="-100"
					max="100" />

				<input
					type="range"
					class="h-12"
					bind:value={lightnessShift}
					on:input={() => {
						editedColors = addHSLShift(colors);
					}}
					on:mouseup={() => updateStore()}
					min="-50"
					max="50" />
			</div>
		</div>
		{#if matched}
			<p class="text-2xl" style="--theme-color: {matchedHex}">
				{matched}
			</p>
		{/if}
		<svg
			preserveAspectRatio="none"
			class="w-[52vw]"
			width="1000"
			height="100"
			viewBox="0 0 1000 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			{#each editedColors as hexes}
				{#each hexes.split(" ") as hex, i}
					<rect
						class="cursor-pointer"
						on:click={() => copyHex(i)}
						on:keypress={() => console.log("key presesd")}
						width="101"
						height="100"
						fill={hex}
						x={i * 100}
						y="0" />
				{/each}
			{/each}
		</svg>
	</article>

	{#if showModalHex}
		<ModalCopyHex {modalHex} />
	{/if}
	{#if showModalSVG}
		<ModalCopySVG />
	{/if}

	<div class="flex flex-col items-center p-4 bg-slate-50 m-4 w-[12vw] rounded-lg">
		<a
			href={"https://uicolors.app/edit?sv1=" + childColorOutput.split(";")[colorIndex]}
			class="text-lg text-center text-black bg-blue-300 p-4 m-8 mt-0 flex-1 w-full rounded-xl shadow-lg shadow-blue-400 hover:bg-blue-200 active:bg-blue-100"
			target="_blank"
			rel="noreferrer">Send {matched} to UIColorsApp</a>
		<button
			on:click={() => {
				outputSVGString();
			}}
			class="text-lg text-center text-black bg-blue-300 p-4 m-8 mb-0 flex-1 w-full rounded-xl shadow-lg shadow-blue-400 hover:bg-blue-200 active:bg-blue-100">
			Copy SVG to clipboard
		</button>
	</div>
	<div class="absolute bg-slate-50 right-12 m-4 rounded-lg">
		<button
			class="bg-red-800 text-white p-4 m-4 rounded-xl shadow-lg shadow-red-400 hover:bg-red-500 active:bg-red-400"
			on:click={() => {
				editedColors = Object.entries(originalColors[colorIndex])[0][1];
				hueShift = 0;
				saturationShift = 0;
				lightnessShift = 0;
				colorToMatch = editedColors.join().split(" ")[4];
				matchedHex = ntc.name(colorToMatch)[0].toLowerCase();
				matched = ntc.name(colorToMatch)[1];
				updateStore();
			}}>
			Reset Color</button>
	</div>
</main>

<style>
	p {
		color: var(--theme-color);
	}
</style>
