import typescript from '@rollup/plugin-typescript';

import { terser } from 'rollup-plugin-terser';

import { readFileSync } from 'fs';

import pkg from './package.json';

const header =
    '/*'
    + '\n'
    + readFileSync(`${__dirname}/LICENSE`).toString().trim()
    + '\n'
    + '*/'
    + '\n'
    + '\n'
    + readFileSync(`${__dirname}/dist/annotations.js`)
    + '\n'
    + readFileSync('header.js', 'utf-8');

export default [
    {
        input: 'src/main.ts',
        output: [
            {
                file: `${__dirname}/dist/js/plugins/${pkg.name}.js`,
                name: pkg.namespace,
                format: 'iife',
                sourcemap: false,
                plugins: [
                    terser({
                        format: {
                            comments: false,
                            preamble: header
                        }
                    })
                ],
                generatedCode: 'es2015',
            },
            {
                file: `${pkg.testProjectDir || `${__dirname}/dist`}/js/plugins/${pkg.name}.debug.js`,
                name: pkg.namespace,
                format: 'iife',
                sourcemap: true,
                banner: header,
                generatedCode: 'es2015',
            }
        ],
        plugins: [
            typescript()
        ]
    }
];
