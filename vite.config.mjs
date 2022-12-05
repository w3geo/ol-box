import { globbySync } from 'globby'; // eslint-disable-line import/no-extraneous-dependencies

const inputs = globbySync('micro-apps/**/*.html');

/** @type {import('vite').UserConfig} */
export default {
  build: {
    rollupOptions: {
      input: inputs.reduce((acc, input) => {
        acc[input] = input;
        return acc;
      }, { index: 'index.html' }),
    },
  },
};
