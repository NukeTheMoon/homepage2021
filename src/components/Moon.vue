<template>
	<div class="moon" />
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted } from '@vue/composition-api';
import * as PIXI from 'pixi.js';

export default defineComponent({
	setup() {
		const pixi = new PIXI().Application({ antialias: true });

		onMounted(() => {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			vm.$el.appendChild(pixi.view);
		});

		return {};
	},
});
</script>

<style lang="scss"></style>
