/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  testMatch: [path.join(__dirname, "*/**/*.@(spec|test).@(js|ts)?(x)")],
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "vue3-jest",
  },
  testEnvironment: "jsdom",
};
