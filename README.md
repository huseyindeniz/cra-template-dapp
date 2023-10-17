# CRA Template: dApp

![downloads](https://img.shields.io/npm/dw/@huseyindeniz/cra-template-dapp)
![version](https://img.shields.io/npm/v/@huseyindeniz/cra-template-dapp)
![build](https://img.shields.io/github/actions/workflow/status/huseyindeniz/cra-template-dapp/ci.yml)

> **Warning**
> [React dApp Template](https://huseyindeniz.github.io/react-dapp-template-documentation/) is available in two versions, and this repository represents the Create React App (CRA) version of it. While I personally favor CRA, there is also an alternative Vite Version offered [here](https://github.com/huseyindeniz/vite-react-dapp-template). It's important to note that Vite is primarily designed for the Vue community and is well-optimized for Vue projects. Btw, I've also noticed that a prominent individual within the React community has been actively discouraging the use of CRA while promoting React frameworks owned by different companies. Consequently, it appears that CRA may no longer be a priority for them. The current CRA version still relies on TypeScript 4.x and lacks support for important features like absolute imports. I intend to keep a close eye on the status of CRA and, if it is not abandoned, I will continue to update this package accordingly.

A create-react-app template specifically designed for decentralized application (dApp) frontend development.

Quick start

```sh
npx create-react-app mydapp --template @huseyindeniz/dapp
cd mydapp
npm start
```

### Tired of searching for and configuring multiple React packages?

The CRA Template: dApp solves this challenge. It includes preconfigured packages for core functionality like routing and state management, as well as specialized features like internationalization. These packages are carefully selected and integrated, eliminating the need for developers to spend time researching and configuring individual packages. With the CRA Template: dApp, developers can quickly build powerful and feature-rich applications without repetitive boilerplate code.

### Benefits of CRA Template: dApp?

Compared to React-based frameworks, CRA Template: dApp allows decentralized hosting, eliminating reliance on a single server. It provides flexibility in tool and technology choices, supporting various React libraries and decentralized storage solutions.

CRA Template: dApp is an easy-to-use foundation for efficiently building high-quality dApps with React, suitable for developers seeking customization and quick development.

## Features

- Authentication with Metamask Wallet
- Wallet Domain Name Support ([ENS](https://ens.domains/) and [AVVY Domains](https://avvy.domains/))
- Internationalization
- Dark Theme
- Page load optimizations
- SEO support

## What's Included and Preconfigured

### Web3 Related Packages

- ethers.js
- typechain

### Testing Infrastucture

- Unit Tests: jest
- Component Unit Tests: React Testing Library + Storybook
- Integration Tests: React Testing Library + Storybook
- E2E Tests: Cypress + Synpress + Cucumber

### Other Packages

**React**: A fast and efficient JavaScript library for building reusable user interfaces.

**TypeScript**: A typed superset of JavaScript that improves code quality and catch errors, particularly beneficial for complex projects.

**Chakra-UI**: A customizable component library for creating accessible user interfaces in React.

**React Router**: A declarative routing library for building single-page applications.

**Redux Toolkit**: A state management toolkit for predictable and scalable application development with Redux.

**Redux Saga**: A library for managing asynchronous logic in Redux applications.

**React Error Boundary**: A feature in React for handling and containing errors within specific components.

**React Helmet**: A library for managing metadata in React applications, optimizing SEO and discoverability.

**I18Next**: An internationalization library for easily translating JavaScript applications into different languages.

**React Icon All Files**: A library providing a collection of high-quality SVG icons for React applications.

**React Cookie Consent**: A library simplifying the implementation of cookie consent banners in React applications.

## Getting Started

Please visit the [Official CRA Tamplate: dApp Documentation Page](https://huseyindeniz.github.io/react-dapp-template-documentation/) to start your dApp frontend development journey.

## Contributions

CRA Template: dApp is an open-source project and we welcome contributions from the community. If you have any suggestions, please use the [discussion](https://github.com/huseyindeniz/cra-template-dapp/discussions) tab. If you have any bug reports, please [open an issue](https://github.com/huseyindeniz/cra-template-dapp/issues) or [submit a pull request](https://github.com/huseyindeniz/cra-template-dapp/pulls).

## License

CRA Template: dApp is licensed under the [MIT License](./LICENSE).
