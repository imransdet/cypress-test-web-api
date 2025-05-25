const { defineConfig } = require("cypress");

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
  },
});