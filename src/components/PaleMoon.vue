<template>
	<div class="pale-moon">
		<g-image ref="core" class="pale-moon__core" src="@/assets/png/core.png" alt="" />
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

			tl.from(vm.$el, { scaleX: 0.6, scaleY: 0.6, yPercent: -20, opacity: 0, duration: 3 });
			tl.to(vm.core, { opacity: 0.9, ease: Power3.easeInOut, duration: 5, repeat: -1, yoyo: true }, '>-1.5');
			tl.to(vm.glow, { opacity: 0.35, ease: Power3.easeInOut, duration: 5, repeat: -1, yoyo: true }, '<');
		});

		return { core, glow };
	},
});
</script>

<style lang="scss">
.pale-moon {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: -20rem;
	margin-bottom: -20rem;
	position: relative;
	overflow: visible;
	pointer-events: none;

	@include landscape {
		margin-top: -35rem;
		margin-right: -10rem;
		max-width: 54vw;
	}

	&__core {
		width: 30.8rem;
		height: 30.8rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(calc(-50% + 0.5px), calc(-50% + 0.5px));
		opacity: 0.7;
	}

	&__glow {
		min-width: 114rem;
		max-width: 114rem;
		min-height: 91.4rem;
		max-height: 91.4rem;
		opacity: 0.2;
	}
}
</style>
