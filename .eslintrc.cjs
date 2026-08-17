module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    // El proyecto es JavaScript sin la dependencia `prop-types`: la regla solo
    // generaba ruido en cada componente. Los tipos son trabajo de TypeScript,
    // pendiente en el roadmap.
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // Scripts de build: corren en Node, no en el navegador.
      files: ['scripts/**/*.mjs', '*.config.js', 'site.config.mjs'],
      env: { node: true, browser: false },
    },
  ],
}
