module.exports = {
  rootDir: "../",
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  collectCoverageFrom: [
    "testing-tools/tools/**/*.js",
  ],
  coveragePathIgnorePatterns: ["/node_modules/"],
  testTimeout: 10000,
  setupFilesAfterEnv: ["<rootDir>/config/jest.setup.js"],
};
