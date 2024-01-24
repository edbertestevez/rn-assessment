module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setupFilesAfterEnv.ts'],
  transformIgnorePatterns: ['"/node_modules/(?!rtn-timer).+\\.js$"'],
};
