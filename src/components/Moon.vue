<template>
	<div class="moon" />
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted } from '@vue/composition-api';
import * as PIXI from 'pixi.js';

export default defineComponent({
	setup() {
		onMounted(() => {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			const pixi = new PIXI.Application({
				antialias: true,
				backgroundAlpha: 0,
				width: vm.$el.offsetWidth,
				height: vm.$el.offsetHeight,
			});

			vm.$el.appendChild(pixi.view);

			const c = new PIXI.Graphics();
			c.beginFill(0xffffff);
			c.drawCircle(pixi.screen.width / 2, pixi.screen.width / 2, 153); // need px by vm converter
			c.endFill();

			pixi.stage.addChild(c);
		});

		return {};
	},
});
</script>

<style lang="scss">
.moon {
	height: 55rem;
}
</style>
