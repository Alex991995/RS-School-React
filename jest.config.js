const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  clearMocks: true,

  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    // '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

    // '^@/components/(.*)$': '<rootDir>/components/$1',

    // '@next/font/(.*)': `<rootDir>/__mocks__/nextFontMock.js`,

    // 'next/font/(.*)': `<rootDir>/__mocks__/nextFontMock.js`,

    // 'server-only': `<rootDir>/__mocks__/empty.js`,
  },

  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',
  moduleNameMapper: {
    // ...
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },

  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(config);
