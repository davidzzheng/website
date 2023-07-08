module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'tailwindcss', '@typescript-eslint'],
}
