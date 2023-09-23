module.exports = {
  automock: false,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  rootDir: '../../',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup-jest.ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
