import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/*.user.js', 'node_modules/**'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      // `a || b` on strings is deliberate in DOM code: an empty attribute should fall through.
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },
  {
    // Node tooling and tests aren't part of the typed project.
    files: ['*.js', '*.config.ts', 'tools/**/*.js', 'tests/**/*.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['*.js', '*.config.ts', 'tools/**/*.js'],
    languageOptions: { globals: globals.node },
    rules: { 'no-console': 'off' },
  }
);
