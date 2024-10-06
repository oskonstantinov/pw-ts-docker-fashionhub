# Playwright TypeScript UI + API Test Project, using Fashionhub test app

This repository contains a sample Playwright framework for UI + API automation using TypeScript. As software under test has been selected FashionHub web application. Tests isolated from code methods according to POM. Page classes managed by "pageManager.ts" to simplify import in tests and improve potential framework scalability. Sensitive data, as passwords and token, are encrypted and stored in "/test-data/data.json". Environment variables, such a base URL, stored in "config.json" file in the root of the project.

## Prerequisites

Before you can start working with this project, ensure that you have the following software installed on your machine:

1. **Node.js** (version 14 or later) + **npm** (is included with Node.js)
   - You can download Node.js from [here](https://nodejs.org/).

2. **Docker**
   - You can download suitable version for your operation system [here](https://docs.docker.com/desktop/)

## Project Setup

Follow these steps to set up the project:

1. **Clone the repository to your machine**

2. **Navigate to the project folder, run terminal and install dependencies using npm:**

```bash
npm install
```

This command will install all the Node packages listed in the "package.json" file.

3. **Install Playwright browsers:**

Playwright requires specific browser binaries to run tests. To install these, run:

```bash
npx playwright install
```

4. **Pull Docker image for the local test execution:**

The FashionHub application available as Docker image, so tests under "local" environment orient to this setup. You need to run previously installed Docker Desktop or CLI version and pull docker image by command:

```bash
docker pull pocketaces2/fashionhub-demo-app 
```

## Running Tests

1. **Local pre-requisites**

Before run tests on local environment make sure that Docker is active and FashionHub docker application is running. You can start it using command:

```bash
docker run -p 4000:4000 pocketaces2/fashionhub-demo-app:latest 
```
Once application launched, it will be available in http://localhost:4000/fashionhub/ 

2. **How to run tests from shell**

There are some pre-defined scripts to run all tests in all browsers for specific environment. For example, to run all tests for local environment execute:

```bash
npm run test_local
```

But if you would like to run same tests only for one browser with headed mode, you can execute:
```bash
env=local npx playwright test --project=chromium --headed
```

More about available options for shell execution you can read in the [official Playwright docs](https://playwright.dev/docs/running-tests#command-line)

3. **How to run tests via Playwright UI**

Playwright also offers a UI to help visualize the tests as they run:

```bash
npx playwright test --ui
```

This command will open a web-based interface where you can see the tests being executed, along with their status.

4. **How to run tests within VSCode**

If you're using VSCode for observe code of this repository, you can run tests here. You just need to install official Playwright extenstion from [here](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright). Or just type "Playwright Test for VSCode" in "Extensions -> Search Extensions" and it will be here. Once installed, the lab flask icon with "Testing" name will appears on the left bar of VSCode and you will be able to run tests.