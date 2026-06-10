module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'coverage'],
  parser: '@typescript-eslint/parser',
  rules: {
    // TypeScript handles undefined identifiers; avoids false positives for
    // Vitest globals (describe/it/expect/vi) enabled via `globals: true`.
    'no-undef': 'off',
    // Pure helpers/constants are intentionally co-located with their component
    // for testability; this rule is a fast-refresh-only heuristic.
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
};
