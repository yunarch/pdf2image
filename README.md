# PDF 2 image

[![CodeQL](https://github.com/yunarch/pdf2image/workflows/CodeQL/badge.svg)](https://github.com/yunarch/pdf2image/actions?query=workflow%3ACodeQL)
[![Deploy & Release ](https://github.com/yunarch/pdf2image/actions/workflows/deploy.yml/badge.svg)](https://github.com/yunarch/pdf2image/actions/workflows/deploy.yml)

Convert PDF files to images with ease.

- [PDF 2 image](#pdf-2-image)
  - [🔗 Requirements](#-requirements)
  - [🚀 Quick Start](#-quick-start)
  - [🚢 Deploy](#-deploy)
  - [🧹 Linting](#-linting)
  - [📐 Format files](#-format-files)
  - [📝 Conventional Commits](#-conventional-commits)

## 🔗 Requirements

Before you can run the project, you will need to ensure that you have the following dependencies installed on your machine:

- **Node.js**: The runtime environment used to build and run the JavaScript code in this repository. You will need to have Node.js version 16 or higher installed. You can download the latest version of Node.js from the official website: [https://nodejs.org](https://nodejs.org).

- **Yarn**: A package manager that is used to install dependencies and manage scripts in this repository. You will need to have Yarn version 1 or higher installed. You can download Yarn from the official website: [https://yarnpkg.com](https://yarnpkg.com).

## 🚀 Quick Start

To get started follow these steps:

1. Install the dependencies required for both the mobile app and the web admin app by running the following command in the root directory of the repository:

```sh
yarn install
```

2.  Start the development server

```sh
yarn dev
```

## 🚢 Deploy

This project utilizes GitHub Actions for streamlined deployments. To release a new version, follow these steps:

1. Navigate to the Actions tab on GitHub.
2. Locate the deployment action and trigger it.
3. The deployment process will automatically publish the Next.js site to GitHub Pages and generate a new release based on the commits since the last release.

> Note: Deployment is limited to authorized users with the necessary permissions.

## 🧹 Linting

We use [ESLint](https://eslint.org/) as our linter to enforce consistent code style and avoid common errors.

Linting is performed using the `lint` and `lint:ts` scripts. The `lint` script will run all available linters, while the `lint:ts` script specifically lints TypeScript files for compilation errors.

To run the linters, use the following commands:

```sh
# Run all available linters
yarn lint

# Lint TypeScript files only for compilation errors
yarn lint:ts
```

We have also integrated ESLint with our CI/CD pipeline, so any linting errors will cause the build to fail.

## 📐 Format files

To maintain consistent code style across the project, we use prettier to format our code. The following scripts are available for formatting files:

- `format`: checks if any files need formatting without actually modifying them.
- `format:all`: formats all files in the project that are supported by prettier.

To run these scripts, use the following commands in your terminal:

```sh
# check which files should be format
yarn format

# Check and format the files
yarn format:all
```

## 📝 Conventional Commits

This repository uses the `conventional-commits` format for commit messages. This style allows for better organization, tracking, and automated release notes. It follows a specific structure, including a type, scope, and subject. To learn more about the conventional-commits format, please visit https://www.conventionalcommits.org/.
