import { computed, onBeforeUnmount, onMounted, ref } from '@vue/composition-api';

let viewportWidth;
let viewportHeight;
let initialized = false;
let isMinMd;
let designWidth;
let vwPx;

function initViewUnitsSystem() {
	viewportHeight = ref(0);
	viewportWidth = ref(0);
	isMinMd = computed(() => viewportWidth.value > 1023);
	designWidth = computed(() => (isMinMd.value ? 1920 : 768));

	vwPx = function (px) {
		return (px / designWidth.value) * viewportWidth.value;
	};

	const updateViewUnits = () => {
		if (process.isClient) {
			viewportHeight.value = window.innerHeight;
			viewportWidth.value = window.innerWidth;
		}
	};

	onMounted(() => {
		updateViewUnits();
		if (process.isClient) {
			window.addEventListener('resize', updateViewUnits);
		}
	});

	onBeforeUnmount(() => {
		if (process.isClient) {
			window.removeEventListener('resize', updateViewUnits);
		}
	});

	initialized = true;
}
export function useViewUnits() {
	if (!initialized) {
		initViewUnitsSystem();
	}

	return {
		isMinMd,
		designWidth,
		vwPx,
		viewportWidth: computed(() => viewportWidth.value),
		viewportHeight: computed(() => viewportHeight.value),
	};
}
