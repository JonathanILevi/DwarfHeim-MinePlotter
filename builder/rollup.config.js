import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import rootImport from 'rollup-plugin-root-import';
import pkg from './package.json';

function basePlugins(nomodule=false) {
	const targets = nomodule ? {browsers:['ie 11']} : {esmodules: true};
	
	const plugins = [
		nodeResolve(),
		rootImport({
			root: `../build`,
			useInput: 'prepend',
		}),
		babel({
			exclude: /node_modules/,
			plugins: [
				"@babel/plugin-syntax-dynamic-import",
				"@babel/plugin-syntax-import-meta",
				["@babel/plugin-proposal-class-properties", { "loose": false }],
				"@babel/plugin-proposal-json-strings",
				"@babel/plugin-proposal-nullish-coalescing-operator",
			],
			presets: [['@babel/preset-env', {
				targets: targets,
				useBuiltIns: 'entry',////"usage",
				corejs: 3,
				modules: false,
				loose: true,
				bugfixes: true
			}]],
		}),
		commonjs(),
		////terser({module: !nomodule}),
	];
	return plugins;
}

// Module config for <script type="module">
const moduleConfig = {
	input: {
		'Main': '../build/modules/Main.m.js',
	},
	output: {
		dir: pkg.config.publicDir,
		format: 'esm',
		entryFileNames: 'modules/[name].m.js',
		chunkFileNames: 'modules/[name].[hash].m.js',
		preserveModulesRoot: 'build',
	},
	plugins: [
		...basePlugins(),
	],
};

// Legacy config for <script nomodule>
const nomoduleConfig = {
	input: {
		'bundle': '../build/modules/Main.m.js',
	},
	output: {
		dir: pkg.config.publicDir,
		format: 'iife',
		entryFileNames: 'scripts/[name].js',
	},
	plugins: basePlugins(true),
	inlineDynamicImports: true,
	watch: {
		clearScreen: false,
	},
};

const configs = [moduleConfig, nomoduleConfig];

export default configs;
