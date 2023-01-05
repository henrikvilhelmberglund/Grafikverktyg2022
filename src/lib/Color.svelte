<script>
	import { toHSL, toHex } from "$lib/colorConvert.js";
	import { ntc } from "$lib/ntc.js";
	export let colors;
	let colorToMatch = colors.join().split(" ")[4];
	export let name = "default";
	let matched = ntc.name(colorToMatch)[1];
	let matchedHex = ntc.name(colorToMatch)[0].toLowerCase();
	console.log(matchedHex);
	let editedColors = colors;
	let userInput = colors;
	$: hueShift = 0;

	function addHueShift(colorString) {
		let splitColorString = colorString[0].split(" ");
		let changedColors = "";
		splitColorString.forEach((color, i) => {
			// console.log(color);
			let hsl = toHSL(color);
			// console.log(hsl);
			let tohexx = toHex(hsl);
			let split = hsl.split("(")[1];
			let hueNew = hsl.split("(")[1];
			let saturation = split.split(",")[1].split("%")[0];
			let lightness = split.split(",")[2].split("%")[0];
			hueNew = +hueNew.split(",")[0];
			hueNew += +hueShift;
			// console.log(hueNew);
			if (hueNew < 0) {
				hueNew += 360;
			}
			if (hueNew >= 360) {
				hueNew -= 360;
			}

			// let hslNew = `hsl(${hueNew}, ${saturation}, ${lightness}`;
			let hex = toHex(hueNew, saturation, lightness);
			// console.log(`${hueNew},${saturation},${lightness}`);
			// console.log(hex);
			if (i < 9) {
				changedColors += hex + " ";
			} else {
				changedColors += hex;
			}
			// console.log(changedColors);
		});
		let outputArray = [];
		outputArray.push(changedColors);
		// outputArray = outputArray;
		// outputArray = outputArray;
		// console.log(outputArray);
		colorToMatch = outputArray.join().split(" ")[4];
		matchedHex = ntc.name(colorToMatch)[0].toLowerCase();
		matched = ntc.name(colorToMatch)[1];
		// console.log(matched);
		return outputArray;
	}
	function log() {
		console.log(colors);
		console.log(editedColors);
		console.log(userInput);
	}

	// TODO
	// fix UIColorsApp output (and add a button for every color to send it to UIColorsApp)
	// add saturation and lightness sliders
	// add copy string button
	// add copy SVG button
</script>

<div class="flex flex-col items-center p-4">
	<div>
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
					colors = Array(userInput);
					editedColors = addHueShift(colors);
				}}
				class="w-[800px] border-black border-2 rounded-lg"
			/>
		</label>
	</div>

	<input
		type="range"
		class="w-[800px] h-24"
		bind:value={hueShift}
		on:input={() => (editedColors = addHueShift(colors))}
		min="-180"
		max="180"
	/>
	<label>
		Hue shift:
		<input
			type="number"
			bind:value={hueShift}
			on:input={() => (editedColors = addHueShift(colors))}
			min="-180"
			max="180"
		/>
	</label>
	{#if matched}
		<p class="text-2xl" style="--theme-color: {matchedHex}">
			{matched}
		</p>
	{/if}
	<svg
		width="1000"
		height="100"
		viewBox="0 0 1000 100"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#each editedColors as hexes}
			{#each hexes.split(" ") as hex, i}
				<rect width="100" height="100" fill={hex} x={i * 100} y="0" />
			{/each}
		{/each}
	</svg>
</div>

<style>
	p {
		color: var(--theme-color);
	}
</style>
