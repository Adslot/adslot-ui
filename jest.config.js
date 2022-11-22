/** @type {import('jest').Config} */
module.exports = {
  transform: {
    '\\.jsx?$': 'babel-jest',
    '\\.css$': '<rootDir>/config/cssTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$'],
  resetMocks: true, // for global mocks in testSetup or __mocks__
  restoreMocks: true,
  resetModules: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/testSetup.js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/**/*.d.ts', '!src/invariant.js'],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95,
    },
  },
  moduleNameMapper: {
    testing$: '<rootDir>/config/testing.js',
  },
};
