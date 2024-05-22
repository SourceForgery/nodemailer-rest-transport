// Contents of the file /rollup.config.js
const typescript = require('rollup-plugin-typescript2');
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

// import dts from "rollup-plugin-dts";
// import typescript from '@rollup/plugin-typescript';
// const typescript = require('@rollup/plugin-typescript')
const config = [
    {
        input: 'index.ts',
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
        },
        plugins: [
            typescript({
                typescript: require(`typescript`),
            }),
            nodeResolve(),
            commonjs()]
    }
];
module.exports = config;