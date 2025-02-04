import eslintConfigAdslot from 'eslint-config-adslot';
import storybook from 'eslint-plugin-storybook';
import jestDom from 'eslint-plugin-jest-dom';
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import typescriptParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default [
  ...eslintConfigAdslot,
  ...storybook.configs['flat/recommended'],
  {
    ignores: ['www/examples/*'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'jest-dom': jestDom,
    },
    settings: {
      lodash: {
        version: 4,
      },
      'import/resolver': {
        alias: {
          map: [['testing', './config/testing']],
        },
      },
    },
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/?(*.)spec.js?(x)'],
    ...jest.configs['flat/recommended'],
    ...jestDom.configs['flat/recommended'],
    ...testingLibrary.configs['flat/react'],
    rules: {
      'jest/expect-expect': 'error',
      'jest/no-commented-out-tests': 'off',
    },
  },
];
