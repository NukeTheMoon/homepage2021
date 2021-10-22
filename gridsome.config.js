// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const CircularDependencyPlugin = require('circular-dependency-plugin');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

function addStyleResource(rule) {
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [path.resolve(__dirname, './src/assets/sass/*.scss')],
		});
}

module.exports = {
	siteName: 'Bartek Jędrasik - paleglow.dev',
	titleTemplate: '%s',
	icon: {
		favicon: './src/favicon.svg',
		touchicon: './src/favicon.png',
	},
	plugins: [{ use: 'gridsome-plugin-composition-api' }],
	css: {
		sourceMap: true,
		loaderOptions: {
			scss: {
				sourceMap: false,
				prependData: `
					@import "@/styles/globals.scss";
					`,
			},
		},
	},
	configureWebpack: {
		plugins: [
			new CircularDependencyPlugin({
				// exclude detection of files based on a RegExp
				exclude: /a\.js|node_modules/,
				include: /src/,
				// add errors to webpack instead of warnings
				failOnError: true,
				// allow import cycles that include an asyncronous import,
				// e.g. via import(/* webpackMode: "weak" */ './file.js')
				allowAsyncCycles: true,
				cwd: process.cwd(),
			}),
		],
		module: {
			rules: isProd
				? [
						{
							test: path.resolve(__dirname, 'node_modules/pixi.js'),
							use: 'null-loader',
						},
				  ]
				: [],
		},
	},
	chainWebpack(config) {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
		types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)));

		config.resolve.alias.set('@static', require('path').resolve(__dirname, 'static'));
		config.resolve.alias.set('@images', require('path').resolve(__dirname, 'static/images'));
	},
};
