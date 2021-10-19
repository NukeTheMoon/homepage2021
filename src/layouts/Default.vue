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
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	width: 100%;
	opacity: 0;

	@include landscape {
		flex-direction: row;
		align-items: center;
	}

	&.loaded {
		opacity: 1;
	}
}
</style>
