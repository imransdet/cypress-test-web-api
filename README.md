# Cypress Automation Testing Project

## 📌 Project Overview

This repository contains Cypress end-to-end and API test automation for the [Cypress Real World App (RWA)](https://github.com/cypress-io/cypress-realworld-app), a full-stack example app built to demonstrate real-world usage of Cypress for testing.

The test suite validates both UI workflows and API endpoints using Cypress with a Page Object Model (POM) structure.

---

## 🧰 Tech Stack

- **Test Framework:** [Cypress](https://www.cypress.io/)
- **Language:** JavaScript
- **Architecture:** Page Object Model (POM)
- **Reports:** HTML reports
- **Data Handling:** Fixtures with Faker for dynamic test data
- **CI/CD:** GitHub Actions (configurable for BitBucket, and GitLab)
- **API Testing:** Cypress `cy.request()` with schema validation: ToDo

---

## 📁 Project Structure

```
cypress/
├── e2e/                # UI test specs
├── api/                # API test specs
├── fixtures/           # Static and dynamic test data
├── pages/              # Page Object Model files
├── reports/            # Test reports (if configured)
├── support/            # Commands and config overrides
cypress.config.js       # Cypress configuration
package.json
README.md
```

---

## ▶️ How to Run Tests Locally

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. 🚀 Start the Real World App locally

```bash
git clone https://github.com/cypress-io/cypress-realworld-app.git
cd cypress-realworld-app
yarn install
yarn start
```

Ensure the app is running at `http://localhost:3000`.

### 3. 🧪 Run tests with Cypress Test Runner

```bash
npx cypress open
```

### 4. 🧪 Run tests in CLI (headless)

```bash
npx cypress run --spec "cypress/e2e/**/*"
npx cypress run --spec "cypress/api/**/*"
```

---

## 🔌 API Testing Example

```js
cy.request('/api/transactions').then((response) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.property('results');
});
```

---

## ✅ Best Practices Followed

- Page Object Model for reusability
- Fixtures and dynamic test data using Faker
- Custom Cypress commands
- Retry-safe selectors using data attributes
- API and UI integration tests
- CI/CD ready configuration

---

## ⚙️ CI/CD Pipeline (GitHub Actions Example)

```yaml
name: Run Cypress Tests

on:
  push:
    branches: [main]

permissions:
  contents: read
  actions: read

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Install test project dependencies
        run: npm ci

      - name: Install Cypress Reporter Dependencies
        run: npm install mochawesome mochawesome-report-generator

      - name: Install Real World App dependencies
        working-directory: ./cypress-realworld-app
        run: |
          set -e # Exit immediately if a command exits with a non-zero status.
          yarn cache clean # Clear yarn cache to ensure fresh install
          # Use --ignore-scripts to prevent the 'postinstall' script (which includes husky) from failing.
          yarn install --frozen-lockfile --ignore-scripts # Keep --ignore-scripts

      - name: Apply Patches for Real World App
        working-directory: ./cypress-realworld-app
        run: npx patch-package || true

      - name: Start Servers and Run Cypress Tests
        run: |
          npx start-server-and-test \
            "cd ./cypress-realworld-app && yarn start:api" http://localhost:3001 \
            "cd ./cypress-realworld-app && yarn start:react" http://localhost:3000 \
            "npx cypress run" # This command will run from the root, finding Cypress files.

      - name: Upload Cypress Artifacts
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-artifacts
          path: |
            mochawesome-report 

```

