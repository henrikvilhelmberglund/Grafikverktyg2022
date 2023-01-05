<script>
	import { toHSL, toHex } from "$lib/colorConvert.js";
	import { ntc } from "$lib/ntc.js";
	export let colors;
	let colorToMatch = colors.join().split(" ")[4];
	export let name = "default";
	let matched = ntc.name(colorToMatch)[1];
	let editedColors = colors;
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
			console.log(hueNew);
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
		matched = ntc.name(colorToMatch)[1];
		console.log(matched);
		return outputArray;
	}
</script>

{editedColors}
{hueShift}
<!-- {name} -->
{#if matched}
	<h2>
		{matched}
	</h2>
{/if}
<label>
	<input type="number" bind:value={hueShift} min="-180" max="180" />
	<input
		type="range"
		class="w-[800px] h-24"
		bind:value={hueShift}
		on:input={() => (editedColors = addHueShift(colors))}
		min="-180"
		max="180"
	/>
</label>
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

<style>
</style>
