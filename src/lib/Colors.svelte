<script>
	import { toHSL, toHex } from "$lib/colorConvert.js";
	import Color from "$lib/Color.svelte";
	let colorArray = {
		// 10 hexes per color
		test: [
			toHex(100, 50, 95) +
				" " +
				toHex(110, 50, 90) +
				" " +
				toHex(120, 50, 81) +
				" " +
				toHex(130, 50, 67) +
				" " +
				toHex(140, 50, 51) +
				" " +
				toHex(150, 50, 50) +
				" " +
				toHex(160, 50, 46) +
				" " +
				toHex(170, 50, 41) +
				" " +
				toHex(180, 50, 35) +
				" " +
				toHex(190, 50, 26)
		],
		indigo: ["#eef2ff #e0e7ff #c7d2fe #a5b4fc #818cf8 #6366f1 #4f46e5 #4338ca #3730a3 #312e81"],
		violet: ["#f5f3ff #ede9fe #ddd6fe #c4b5fd #a78bfa #8b5cf6 #7c3aed #6d28d9 #5b21b6 #4c1d95"],
		purple: ["#faf5ff #f3e8ff #e9d5ff #d8b4fe #c084fc #a855f7 #9333ea #7e22ce #6b21a8 #581c87"],
		pink: ["#fdf2f8 #fce7f3 #fbcfe8 #f9a8d4 #f472b6 #ec4899 #db2777 #be185d #9d174d #831843"],
		rose: ["#fff1f2 #ffe4e6 #fecdd3 #fda4af #fb7185 #f43f5e #e11d48 #be123c #9f1239 #881337"],
		red: ["#fef2f2 #fee2e2 #fecaca #fca5a5 #f87171 #ef4444 #dc2626 #b91c1c #991b1b #7f1d1d"],
		orange: ["#fff7ed #ffedd5 #fed7aa #fdba74 #fb923c #f97316 #ea580c #c2410c #9a3412 #7c2d12"],
		amber: ["#fffbeb #fef3c7 #fde68a #fcd34d #fbbf24 #f59e0b #d97706 #b45309 #92400e #78350f"],
		lime: ["#f7fee7 #ecfccb #d9f99d #bef264 #a3e635 #84cc16 #65a30d #4d7c0f #3f6212 #365314"],
		green: ["#f0fdf4 #dcfce7 #bbf7d0 #86efac #4ade80 #22c55e #16a34a #15803d #166534 #14532d"],
		emerald: ["#ecfdf5 #d1fae5 #a7f3d0 #6ee7b7 #34d399 #10b981 #059669 #047857 #065f46 #064e3b"],
		teal: ["#f0fdfa #ccfbf1 #99f6e4 #5eead4 #2dd4bf #14b8a6 #0d9488 #0f766e #115e59 #134e4a"]
	};
	console.log(toHex(100, 50, 50) + " " + toHex(110, 50, 50));
	function outputUIColors(object) {
		let outputColor = "";
		let outputColors = "";
		Object.entries(object).forEach((array) => {
			array[1].forEach((color) => {
				outputColor = array[0] + ":";
				color = color.split(" ");
				color.forEach((item, j) => {
					item = item.replaceAll("#", "");
					item = j === 0 ? "50-" + item : `/${j * 100}-` + item;
					outputColor += item;
				});
				outputColors += `${outputColor};`;
				outputColors = outputColors.slice(0, -1);
				outputColors += ";";
			});
		});
		outputColors = outputColors.slice(0, -1);
		return outputColors;
	}
	$: link = "https://uicolors.app/edit?sv1=" + outputUIColors(colorArray);
	// console.log("https://uicolors.app/edit?sv1=" + outputUIColors(colorArray));
</script>

<main class="p-4">
	<h1 class="font-bold text-lg">Colors</h1>
	<a href={link} class="text-lg text-blue-600" target="_blank" rel="noreferrer">UIColorsApp</a>

	{#each Object.entries(colorArray) as color}
		<Color name={color[0]} colors={color[1]} />
	{/each}
</main>
