const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    experimentalStudio: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'mochawesome-report',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mm-dd-yyyy_HH-MM-ss'
    },
    env: {
      apiToken: process.env.API_TOKEN,
      secretKey: process.env.SECRET_KEY
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});