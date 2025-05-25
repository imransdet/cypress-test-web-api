# Cypress Automation Testing Project

## 📌 Project Overview

This repository contains Cypress end-to-end and API test automation for the [Cypress Real World App (RWA)](https://github.com/cypress-io/cypress-realworld-app), a full-stack example app built to demonstrate real-world usage of Cypress for testing.

The test suite validates both UI workflows and API endpoints using Cypress with a Page Object Model (POM) structure.

---

## 🧰 Tech Stack

- **Test Framework:** [Cypress](https://www.cypress.io/)
- **Language:** JavaScript
- **Architecture:** Page Object Model (POM)
- **Reports:** HTML reports (optional)
- **Data Handling:** Fixtures with Faker for dynamic test data
- **CI/CD:** Bitbucket Pipelines (configurable for GitHub Actions, GitLab)
- **API Testing:** Cypress `cy.request()` with schema validation

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
npm install
npm start
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

## ⚙️ CI/CD Pipeline (GitHub Action Example)

```yaml
name: Run Cypress Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Start Application (Optional)
        run: npm run start & npx wait-on http://localhost:3000

      - name: Run Cypress Tests
        run: npx cypress run

      - name: Upload Cypress videos & screenshots on failure
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: cypress-artifacts
          path: |
            cypress/videos
            cypress/screenshots

```

---

## 🤝 Contributing

Feel free to fork the repository and submit a pull request. Bug reports, feature requests, and suggestions are welcome!

---

## 📬 Contact

**Maintainer:** _AL IMRAN_  
**LinkedIn:** [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)  
**Email:** your.email@example.com