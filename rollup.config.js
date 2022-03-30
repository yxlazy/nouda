import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json';

export default [
  {
    input: "src/index.ts",
    output: [
      {
        format: "umd",
        file: pkg.main,
        name: 'Nouda',
      },
      {
        format: "es",
        file: pkg.module,
        name: 'Nouda',
      }
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
    ]
  },
];
