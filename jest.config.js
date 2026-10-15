module.exports = {
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  reporters: ['default', 'jest-junit'],
  coveragePathIgnorePatterns: ['node_modules'],
  clearMocks: true,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // Keep the pre-Jest 29 snapshot format so existing snapshots stay valid.
  snapshotFormat: { escapeString: true, printBasicPrototype: true },
  setupFiles: ['<rootDir>/src/setupTests.ts'],
};
