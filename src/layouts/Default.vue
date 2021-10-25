<template>
	<div class="layout" :class="{ loaded: isLoaded }">
		<pale-noise />

		<slot />
	</div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api';

import PaleNoise from '@/components/PaleNoise';
import { initFirebase } from '@/helpers/initFirebase';

export default defineComponent({
	components: { PaleNoise },
	setup() {
		const isLoaded = ref(false);

		onMounted(() => {
			initFirebase();
			isLoaded.value = true;
		});

		return { isLoaded };
	},
});
</script>

<style lang="scss">
.layout {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	height: 100%;
	overflow: hidden;
	opacity: 0;

	@include landscape {
		flex-direction: row;
		align-items: center;
		justify-content: normal;
	}

	&.loaded {
		opacity: 1;
	}
}
</style>
