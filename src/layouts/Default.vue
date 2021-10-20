<template>
	<div class="layout" :class="{ loaded: isLoaded }">
		<slot />
	</div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api';

import { initFirebase } from '@/helpers/initFirebase';

export default defineComponent({
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
	@include landscape {
		flex-direction: row;
		align-items: center;
		justify-content: normal;
	}

	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	height: 100%;
	overflow: hidden;
	opacity: 0;

	&.loaded {
		opacity: 1;
	}
}
</style>
