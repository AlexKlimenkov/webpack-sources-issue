const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const WrapperPlugin = require('wrapper-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, './index.js'),
	devtool: false,
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new WrapperPlugin({
			header: () => fs.readFileSync(path.resolve(__dirname, 'shim.js'), 'utf8'),
		}),
	],
	target: 'web',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						collapse_vars: false,
						conditionals: false,
						comparisons: false,
					},
					output: {
						comments: true,
					},
				},
			}),
		],
	},
}

