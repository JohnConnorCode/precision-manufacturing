import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks,
      '@next/next': next,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readable',
        JSX: 'readable',
        NodeJS: 'readable',
        console: 'readable',
        process: 'readable',
        window: 'readable',
        document: 'readable',
        navigator: 'readable',
        fetch: 'readable',
        URL: 'readable',
        URLSearchParams: 'readable',
        setTimeout: 'readable',
        clearTimeout: 'readable',
        setInterval: 'readable',
        clearInterval: 'readable',
        Buffer: 'readable',
        global: 'readable',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': ['error', {
        ignore: [
          'args', 'attach', 'position', 'rotation', 'scale',
          'intensity', 'color', 'visible', 'side',
          'metalness', 'roughness', 'emissive', 'emissiveIntensity',
          'envMapIntensity', 'transparent', 'opacity'
        ]
      }],
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-undef': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      'public/**',
    ],
  },
];