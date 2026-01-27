export default {
  testEnvironment: "node",
  testMatch: ["**/*.test.js"],
  collectCoverageFrom: [
    "testing-tools/tools/**/*.js",
    "!testing-tools/tools/**/*.test.js",
    "!testing-tools/tools-style.css",
    "!testing-tools/testing-tools.js"
  ],
  coveragePathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: [],
  moduleFileExtensions: ["js", "json"],
  testTimeout: 10000
};
