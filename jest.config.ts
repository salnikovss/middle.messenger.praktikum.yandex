import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [`/node_modules/(?!nanoid)`],
  moduleNameMapper: {
    '^nanoid(/(.*)|$)': 'nanoid$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',
  },
  clearMocks: true,
};

export default jestConfig;
