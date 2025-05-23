import prettierConfig from '@yunarch/config-web/prettier';

/** @type {import("prettier").Options} */
export default {
  ...prettierConfig,
  plugins: ['prettier-plugin-tailwindcss'],
};
