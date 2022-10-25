import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [`/node_modules/(?!nanoid)`],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^nanoid(/(.*)|$)': 'nanoid$1',
    '^config/(.*)$': '<rootDir>/src/config/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^core/(.*)$': '<rootDir>/src/core/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^pages/(.*)$': '<rootDir>/src/pages/$1',
  },
  clearMocks: true,
};

export default jestConfig;
