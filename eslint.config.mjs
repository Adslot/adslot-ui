import { defineConfig } from 'eslint/config';
import eslintConfigAdslot from 'eslint-config-adslot';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginJestDom from 'eslint-plugin-jest-dom';
import eslintPluginTestingLibrary from 'eslint-plugin-testing-library';
import storybook from 'eslint-plugin-storybook';

const testFiles = ['**/*.spec.{js,jsx}'];

export default defineConfig([
  eslintConfigAdslot,
  storybook.configs['flat/recommended'],
  {
    ignores: ['www/examples/*'],
    settings: {
      lodash: {
        version: 4,
      },
    },
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: testFiles,
    rules: {
      ...eslintPluginJest.configs['flat/recommended'].rules,
    },
  },
  {
    files: testFiles,
    ...eslintPluginJestDom.configs['flat/recommended'],
  },
  {
    files: testFiles,
    ...eslintPluginTestingLibrary.configs['flat/react'],
  },
  {
    files: testFiles,
    settings: {
      'import/resolver': {
        alias: {
          map: [['testing', './config/testing']],
        },
      },
    },
    rules: {
      'testing-library/no-node-access': 'off',
    },
  },
]);
