const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './debug/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	watch: true,
	plugins: [
		new CopyPlugin([
			{ from: 'debug/index.html', to: './' },
		]),
	],
};