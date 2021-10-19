<template>
	<div class="pale-noise" />
</template>

<script>
import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, watch } from '@vue/composition-api';

import { useViewUnits } from '@/composables/useViewUnits';

export default defineComponent({
	setup() {
		const { viewportWidth, viewportHeight } = useViewUnits();

		onMounted(async () => {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			if (process.isClient) {
				const PIXI = await import('pixi.js');
				const pixi = new PIXI.Application({
					backgroundAlpha: 0,
					resizeTo: vm.$el,
				});

				function updateRect() {
					rect.beginFill(0x000000);
					rect.drawRect(0, 0, pixi.screen.width, pixi.screen.height);
					rect.endFill();
				}

				const rect = new PIXI.Graphics();
				updateRect();
				rect.blendMode = PIXI.BLEND_MODES.SCREEN;
				pixi.stage.addChild(rect);

				const noiseFilter = new PIXI.filters.NoiseFilter();
				noiseFilter.noise = 0.1;
				noiseFilter.seed = Math.random() / 10;
				rect.filters = [noiseFilter];

				const ticker = PIXI.Ticker.shared;
				ticker.maxFPS = 8;
				ticker.add(() => {
					noiseFilter.seed = Math.random() / 10;
				});

				vm.$el.appendChild(pixi.view);

				watch([viewportWidth, viewportHeight], () => {
					updateRect();
				});
			}
		});

		return {};
	},
});
</script>

<style lang="scss">
.pale-noise {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: linear-gradient(315deg, #282828, #090909);
	background-attachment: fixed;

	canvas {
		opacity: 0.8;
		mix-blend-mode: screen;
	}
}
</style>
