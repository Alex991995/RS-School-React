const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,

  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },

  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  globals: {
    TextEncoder: require('util').TextEncoder,
    TextDecoder: require('util').TextDecoder,
  },

  collectCoverage: true,

  coverageProvider: 'v8',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/app/**/*.{ts,tsx}',
    'src/features/**/*.{ts,tsx}',
    '!**/node_modules/**',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};

module.exports = createJestConfig(config);
