<template>
	<div class="pale-noise" />
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted } from '@vue/composition-api';

export default defineComponent({
	setup() {
		onMounted(() => {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			if (process.isClient) {
				import('pixi.js').then(PIXI => {
					const pixi = new PIXI.Application({
						backgroundAlpha: 0,
						width: vm.$el.scrollWidth,
						height: vm.$el.offsetHeight,
					});

					const g = new PIXI.Graphics();
					g.beginFill(0x000000);
					g.drawRect(0, 0, pixi.screen.width, pixi.screen.height);
					g.blendMode = PIXI.BLEND_MODES.SCREEN;
					pixi.stage.addChild(g);

					const noiseFilter = new PIXI.filters.NoiseFilter();
					noiseFilter.noise = 0.1;
					noiseFilter.seed = Math.random() / 10;
					g.filters = [noiseFilter];

					const ticker = PIXI.Ticker.shared;
					ticker.maxFPS = 8;
					ticker.add(() => {
						noiseFilter.seed = Math.random() / 10;
					});

					vm.$el.appendChild(pixi.view);
				});
			}
		});

		return {};
	},
});
</script>

<style lang="scss">
.pale-noise {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	$gradient: linear-gradient(315deg, #282828, #090909);

	background: $gradient;
	background-attachment: fixed;

	canvas {
		mix-blend-mode: screen;
		opacity: 0.8;
	}
}
</style>
