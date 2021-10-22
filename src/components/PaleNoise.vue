<template>
	<div class="pale-noise" />
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, watch } from '@vue/composition-api';
import { Tween } from 'gsap/gsap-core';

import * as PIXI from 'pixi.js';

import { useViewUnits } from '@/composables/useViewUnits';

export default defineComponent({
	setup() {
		const { viewportWidth, viewportHeight } = useViewUnits();

		onMounted(async () => {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			if (process.isClient) {
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

				const seeds = [
					0.02427945462187342, 0.04975750278181321, 0.07347499732114933, 0.0007768083588748587,
					0.03651828685871774, 0.07480199919126793, 0.06325890990877678, 0.0678807679102282,
					0.05930468916680363, 0.06439113054845055, 0.026350829414593012, 0.03233621911450568,
					0.0370197515504815, 0.05515579147063132, 0.07003763056530557,
				];
				let seedNo = 0;

				function cycleSeed() {
					seedNo = seedNo < seeds.length - 1 ? ++seedNo : 0;

					return seeds[seedNo];
				}

				const noiseFilter = new PIXI.filters.NoiseFilter();
				noiseFilter.noise = 0.1;
				noiseFilter.seed = cycleSeed();
				rect.filters = [noiseFilter];

				const ticker = PIXI.Ticker.shared;
				ticker.minFPS = 7;
				ticker.maxFPS = 7;
				ticker.add(() => {
					noiseFilter.seed = cycleSeed();
				});

				vm.$el.appendChild(pixi.view);

				watch([viewportWidth, viewportHeight], () => {
					updateRect();
				});

				Tween.to(vm.$el, { opacity: 1, duration: 4 });
			}
		});

		return {};
	},
});
</script>

<style lang="scss">
.pale-noise {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	opacity: 0;
	background: linear-gradient(315deg, $color-gradient-1, $color-gradient-2);
	background-attachment: fixed;

	@include landscape {
		background: linear-gradient(to top left, $color-gradient-1, $color-gradient-2);
	}

	canvas {
		opacity: 0.9;
		mix-blend-mode: screen;
	}
}
</style>
