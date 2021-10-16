module.exports = {
  env: {
    browser: true,
    es2021: true,

  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  ignorePatterns: ['*.html', '*.js'],
  rules: {
    'linebreak-style': 'off',
    'import/extensions': [
      'warn',
      'ignorePackages',
      { ts: 'never', json: 'always' },
    ],
    'no-param-reassign': [
      'error',
      { props: false },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-underscore-dangle': 'off',
    'no-new': 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
