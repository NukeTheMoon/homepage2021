// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const path = require('path');
let i = 0;

module.exports = function (api) {
	api.loadSource(({ addCollection }) => {
		// Use the Data Store API here: https://gridsome.org/docs/data-store-api/
	});

	api.createPages(({ createPage }) => {
		// Use the Pages API here: https://gridsome.org/docs/pages-api/
	});

	api.configureWebpack(config => {
		if (i === 1) {
			config.module.rules.push({
				test: path.resolve(__dirname, 'node_modules/pixi.js'),
				use: 'null-loader',
			});
		}
		i++;

		return config;
	});
};
