# Playwright TypeScript UI + API Test Project, using Fashionhub test app

This repository contains a sample Playwright framework for UI + API automation using TypeScript. As software under test has been selected FashionHub. Tests isolated from code methods according to POM. Sensitive data, as passwords and token, are encrypted and stored in JSON file. Environment variables, such a base URL, stored in config.json.

## Prerequisites

Before you can start working with this project, ensure that you have the following installed on your machine:

1. **Node.js** (version 14 or later) + **npm** (is included with Node.js)
   - You can download Node.js from [here](https://nodejs.org/).

2. **Docker**
   - You can download suitable version for your operation system [here](https://docs.docker.com/desktop/)

## Project Setup

Follow these steps to set up the project:

1. **Clone the repository**

2. **Navigate to the project folder, run terminal and install dependencies using npm:**

```bash
npm install
```

This command will install all the Node packages listed in the package.json file, including Playwright.

3. **Install Playwright browsers:**

Playwright requires specific browser binaries to run tests. To install these, run:

```bash
npx playwright install
```

## Running Tests
There are some pre-defined scripts to run all tests in all browsers for specific environment. For example, to run all tests for local environment execute:

```bash
npm run test_local
```

But if you would like to run same tests only for one browser with headed mode, you can execute:
```bash
environment=local npx playwright test --project=chromium --headed
```

# Run tests with UI:

Playwright also offers a UI to help visualize the tests as they run:

```bash
npx playwright test --ui
```

This command will open a web-based interface where you can see the tests being executed, along with their status.