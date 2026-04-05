import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import unicorn from 'eslint-plugin-unicorn';
import sonarjs from 'eslint-plugin-sonarjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  // ── Ignore generated / non-source dirs ──────────────────────────────────
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/**', 'scripts/**'],
  },

  // ── Base JS + TypeScript strict (no project needed — applies everywhere) ─
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // ── Type-checked rules — real .ts files only (exclude Astro virtual blocks) ─
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.astro/**'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      }],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },

  // ── Global TS rules (all files) ──────────────────────────────────────────
  {
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
    },
  },

  // ── Astro component files ────────────────────────────────────────────────
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    rules: {
      'astro/no-unused-define-vars-in-style': 'error',
    },
  },

  // ── SonarJS — duplication & complexity ──────────────────────────────────
  {
    files: ['src/**/*.{ts,astro}'],
    plugins: { sonarjs },
    rules: {
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-unused-collection': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/no-duplicate-string': ['error', { threshold: 4 }],
    },
  },
  // Data files: higher threshold — strings repeat across translation keys intentionally
  {
    files: ['src/data/**/*.ts'],
    plugins: { sonarjs },
    rules: {
      'sonarjs/no-duplicate-string': ['error', { threshold: 10 }],
    },
  },

  // ── Unicorn — minimal, modern code ──────────────────────────────────────
  {
    files: ['src/**/*.{ts,astro}'],
    plugins: { unicorn },
    rules: {
      'unicorn/no-for-loop': 'error',
      'unicorn/no-array-for-each': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/no-useless-undefined': 'error',
      'unicorn/prefer-logical-operator-over-ternary': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      'unicorn/no-unused-properties': 'error',
      'unicorn/prefer-ternary': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/no-lonely-if': 'error',
    },
  },
);
