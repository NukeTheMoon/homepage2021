// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import './styles/main.scss';

import VueCompositionAPI from '@vue/composition-api';

import DefaultLayout from '~/layouts/Default.vue';

import { isFirefox } from './tools/browsers';

if (isFirefox()) {
	document.documentElement.classList.add('firefox');
}

export default function (Vue, { router, head, isClient }) {
	Vue.use(VueCompositionAPI);
	Vue.component('Layout', DefaultLayout);
}
