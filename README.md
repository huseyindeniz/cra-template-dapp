# @huseyindeniz/cra-template-dapp

A create-react-app template specifically designed for decentralized application (dApp) development.

## Why use dApp CRA Template?

If you're building a dApp, you have a few different options for setting up your frontend project. One popular choice is Next.js, a JavaScript framework that builds on top of React. However, Next.js has some limitations and challenges that can make it difficult to use for dApp development, such as:

-Next.js is not well-suited for dApps that require complex client-side logic or interactivity.

- Next.js requires a lot of configuration and setup to work with dApp-specific technologies such as Ethereum and Web3.
- Next.js adds extra overhead and complexity to the dApp's architecture, which can make it more difficult to maintain and scale.

dApp CRA Template is an alternative to Next.js that provides a more flexible and customizable foundation for building dApps. It uses the same underlying technology (React) as Next.js, but it doesn't come with the same constraints and limitations. With dApp CRA Template, you can take advantage of the full power of React to build dApps that are fast, scalable, and user-friendly.

## Features

- Wallet:
- Code splitting
- Internationalization
- Dark/Light Color Mode
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

- **React**: is a JavaScript library for building user interfaces.
- **TypeScript**: is a typed superset of JavaScript that compiles to plain JavaScript.
- **Chakra-UI**: is a component library for building accessible and customizable user interfaces with React.
- **React Router**: is a routing library for React applications, allowing developers to define and manage routes in a declarative way.
- **Redux Toolkit**: is a toolkit for Redux, a popular state management library for JavaScript applications. Redux Saga is a library that makes it easier to manage side effects (asynchronous logic) in Redux applications.
- **React Error Boundary**: is a feature of React that allows developers to catch and handle errors that occur in a specific component or its descendants.
- **React Helmet**: is a library that allows developers to manage the metadata of a React application, such as the title, description, and keywords, in a declarative way.
- **I18Next**: is an internationalization (i18n) library for JavaScript applications. Browser Language Detector is a library that automatically detects the user's language based on the browser settings.
- **React Hook Form**: is a library for managing form state and validation in React applications.
- **Zod**: is a schema validation library that can be used with React Hook Form.
- **React Icon All Files**: is a library that provides a collection of high-quality SVG icons for use in React applications.
- **React Date Picker**: is a customizable date picker component for React applications.
- **React Count Down Circle Timer**: is a customizable timer component that displays a countdown in the form of a circular progress bar.
- **React Cookie Consent**: is a library that makes it easy to implement a cookie consent banner in a React application.

## Getting Started

### Installation

```sh
npx create-react-app my-app --template @huseyindeniz/dapp
```

### Configuration

Open the following files under the src/config folder:

TODO
...

## Contributions

dApp CRA Template is an open-source project and we welcome contributions from the community. If you have any suggestions or bug reports, please [open an issue](./issues) or [submit a pull request](./pulls).

## License

dApp CRA Template is licensed under the [MIT License](./LICENSE).
