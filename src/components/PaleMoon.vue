<template>
	<div class="pale-moon">
		<g-image ref="core" class="pale-moon__core" src="@/assets/png/moon.png" alt="" />
		<g-image ref="glow" class="pale-moon__glow" src="@/assets/png/glow.png" alt="" />
	</div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from '@vue/composition-api';
import gsap, { Power3 } from 'gsap/gsap-core';

export default defineComponent({
	setup() {
		const core = ref(),
			glow = ref();

		onMounted(() => {
			const { proxy: vm } = getCurrentInstance();

			if (!vm) return;

			const tl = gsap.timeline();

			tl.from(vm.$el, { scaleX: 0.8, scaleY: 0.8, yPercent: -20, opacity: 0, duration: 3 });
			tl.to(vm.core, { opacity: 0.8, ease: Power3.easeInOut, duration: 4, repeat: -1, yoyo: true }, '>-1.5');
			tl.to(vm.glow, { opacity: 0.25, ease: Power3.easeInOut, duration: 4, repeat: -1, yoyo: true }, '<');
		});

		return { core, glow };
	},
});
</script>

<style lang="scss">
.pale-moon {
	position: relative;
	overflow-x: hidden;
	overflow-y: visible;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: -20rem;
	margin-bottom: -20rem;

	@include landscape {
		margin-top: -40rem;
		margin-right: -10rem;
	}

	&__core {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(calc(-50% + 0.5px), calc(-50% + 0.5px));
		width: 30.8rem;
		height: 30.8rem;
		opacity: 0.6;
	}

	&__glow {
		width: 114rem;
		height: 91.4rem;
		max-width: none;
		opacity: 0.1;
	}
}
</style>
