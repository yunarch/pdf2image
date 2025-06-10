import { config } from '@yunarch/config-web/eslint';

export default config(
  {
    typescript: {
      tsconfigPath: './tsconfig.json',
    },
    react: true,
  },
  {
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  }
);
