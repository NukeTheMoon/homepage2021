<template>
	<div class="layout">
		<slot />
	</div>
</template>

<script>
import { defineComponent, onMounted } from '@vue/composition-api';

import { initFirebase } from '@/helpers/initFirebase';

export default defineComponent({
	setup() {
		onMounted(() => {
			initFirebase();
		});

		return {};
	},
});
</script>

<style lang="scss">
.layout {
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	width: 100%;

	@include landscape {
		flex-direction: row;
	}
}
</style>
