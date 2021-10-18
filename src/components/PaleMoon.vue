<template>
	<div class="pale-moon" />
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted } from '@vue/composition-api';
import Colr from 'colr';

import { useViewUnits } from '@/composables/useViewUnits';

export default defineComponent({
	setup() {
		const colr = new Colr();
		const { vwPx } = useViewUnits();

		onMounted(() => {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			if (process.isClient) {
				import('pixi.js').then(PIXI => {
					const pixi = new PIXI.Application({
						antialias: true,
						backgroundAlpha: 0,
						width: vm.$el.scrollWidth,
						height: vm.$el.offsetHeight,
					});
					const color = '#d2314b';

					function gradient(from, to) {
						const c = document.createElement('canvas');
						const ctx = c.getContext('2d');
						const grd = ctx.createLinearGradient(0, 0, 100, 100);

						grd.addColorStop(0, from);
						grd.addColorStop(1, to);
						ctx.fillStyle = grd;
						ctx.fillRect(0, 0, 100, 100);

						return new PIXI.Texture.from(c);
					}

					function hexRgba(hex, a) {
						const rgb = colr.fromHex(hex).toRgbArray();

						return `rgba(${rgb.join(', ')}, ${a})`;
					}

					vm.$el.appendChild(pixi.view);

					const c = new PIXI.Graphics()
						.beginTextureFill(gradient(hexRgba(color, 1), hexRgba(color, 0)))
						.drawCircle(pixi.screen.width / 2, pixi.screen.width / 2, vwPx(153));

					pixi.stage.addChild(c);
				});
			}
		});

		return {};
	},
});
</script>

<style lang="scss">
.pale-moon {
	height: 55rem;
}
</style>
