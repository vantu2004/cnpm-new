import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.es.js",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: [".js", ".jsx"],
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".js", ".jsx"], // 👈 bắt buộc để Babel bắt JSX
    }),
  ],
};
