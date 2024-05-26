const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  fixturesFolder: "fixtures",
  pageLoadTimeout: 60000,
  viewportHeight: 850,
  viewportWidth: 1500,
  chromeWebSecurity: false,
  video: false,
  retries: {
    "runMode": 1,
    "openMode": 1
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    env:{
      "standardUser": "standard_user",
      "lockedoutUser": "locked_out_user",
      "problemUser": "problem_user",
      "performanceglitchUser": "performance_glitch_user",
      "password": "secret_sauce"
    },
    baseUrl:
    'https://qa-challenge.codesubmit.io/',
  },
});


