/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testMatch: [path.join(__dirname, "*/**/*.@(spec|test).@(js|ts)?(x)")],
  testPathIgnorePatterns: ["e2e"],
};
