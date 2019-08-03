import typescript from 'rollup-plugin-typescript'
import common from 'rollup-plugin-commonjs'

export default {
  input: './src/commands.ts',
  output: [{
    file: './dist/index.js',
    format: 'commonjs'
  }],
  plugins: [
    common(),
    typescript()
  ]
}
