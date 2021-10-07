// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import './styles/globals.scss';

import VueCompositionAPI from '@vue/composition-api';

export default function (Vue, { router, head, isClient }) {
  Vue.use(VueCompositionAPI);
  Vue.component('Layout', DefaultLayout)
}