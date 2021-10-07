// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
	siteName: 'homepage2021',
	icon: './src/favicon.png',
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
	},
	chainWebpack(config) {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];

		config.resolve.alias.set('@static', require('path').resolve(__dirname, 'static'));
		config.resolve.alias.set('@images', require('path').resolve(__dirname, 'static/images'));
	},
};
