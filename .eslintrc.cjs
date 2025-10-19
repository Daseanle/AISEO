/* eslint-env node */
/**
 * Root ESLint configuration for the monorepo.
 * - Base TypeScript + Prettier setup
 * - Overrides for Next.js (apps/web) and NestJS (apps/api)
 */
module.exports = {
  root: true,
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/build/**',
    '**/coverage/**'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: false
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.base.json']
      }
    }
  },
  env: {
    es2022: true
  },
  overrides: [
    {
      files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
      env: {
        browser: true
      },
      rules: {
        // Next.js-specific preferences can be added here in the future
      }
    },
    {
      files: ['apps/api/**/*.{ts,js}'],
      env: {
        node: true
      },
      rules: {
        // NestJS-specific preferences can be added here in the future
      }
    },
    {
      files: ['packages/**/*.{ts,tsx,js,jsx}'],
      env: {
        node: true
      }
    }
  ]
};
