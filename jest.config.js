module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.test.js"],
  collectCoverageFrom: [
    "testing-tools/tools/**/*.js",
    "!testing-tools/tools/**/*.test.js",
  ],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testTimeout: 10000,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};


