<script>
	// import rive from '@rive-app/canvas';
	import { Alignment, Fit, Layout, Rive } from '@rive-app/canvas';
	import { onMount } from 'svelte';
	let currentState;
	let canvas;
	onMount(() => {
		new Rive({
			// src: 'https://cdn.rive.app/animations/vehicles.riv',
			src: './rating_animation.riv',
			// Or the path to a local Rive asset
			// src: './example.riv',
			canvas: canvas,
			autoplay: true,
			stateMachines: 'State Machine 1',
			animations: 'Idle_empty',
			onStateChange: (event) => {
				currentState = event.data[0];
			}
		});
	});
</script>

<canvas
	id="canvas"
	class="absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4"
	width="500"
	height="500"
	bind:this={canvas}
/>
<div class="absolute top-1/3 left-2/4 transform -translate-x-2/4">
	<p class="text-xl">
		current state is: {currentState}
		{#if currentState === 'Idle_empty'}
			<p>Beep boop! Idling. Click a star.</p>
		{:else if currentState === '1_star'}
			<p>Meh, not very good.</p>
		{:else if currentState === '2_stars'}
			<p>Needs some improvement.</p>
		{:else if currentState === '3_stars'}
			<p>Getting better!</p>
		{:else if currentState === '4_stars'}
			<p>Pretty good!</p>
		{:else if currentState === '5_stars'}
			<p>Awesome dude!</p>
		{/if}
	</p>
</div>

<style>
	:global(:root) {
		@apply bg-slate-300;
	}
</style>
