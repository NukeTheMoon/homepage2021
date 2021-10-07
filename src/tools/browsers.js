export function isIe() {
	if (!process.isClient) {
		return false;
	}

	const ua = window.navigator.userAgent;
	const msie = ua.indexOf('MSIE ');

	return msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./);
}

export function isEdge() {
	if (!process.isClient) {
		return false;
	}

	return /Edge\/\d./i.test(navigator.userAgent);
}

export function isSafari() {
	if (!process.isClient) {
		return false;
	}

	return !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/);
}

export function isFirefox() {
	if (!process.isClient) {
		return false;
	}

	return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

export function isOpera() {
	if (!process.isClient) {
		return false;
	}

	const windowWithOpera = window;

	return (
		(!!windowWithOpera.opr && !!windowWithOpera.opr.addons) ||
		!!windowWithOpera.opera ||
		navigator.userAgent.indexOf(' OPR/') >= 0
	);
}

export function isChrome() {
	if (!process.isClient) {
		return false;
	}

	const isChromium = window.chrome;
	const winNav = window.navigator;
	const vendorName = winNav.vendor;
	const isIEedge = winNav.userAgent.indexOf('Edge') > -1;

	return (
		isChromium !== null &&
		typeof isChromium !== 'undefined' &&
		vendorName === 'Google Inc.' &&
		isOpera() === false &&
		isIEedge === false
	);
}

export function isIOS() {
	if (!process.isClient) {
		return false;
	}

	return (
		(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) ||
		(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
	);
}

export function isIOSChrome() {
	if (!process.isClient) {
		return false;
	}

	return !!navigator.userAgent.match('CriOS');
}

export function isIOSFirefox() {
	if (!process.isClient) {
		return false;
	}

	return !!navigator.userAgent.match('FxiOS');
}

export function isAndroid() {
	if (!process.isClient) {
		return false;
	}

	return navigator.userAgent.toLowerCase().indexOf('android') > -1;
}
