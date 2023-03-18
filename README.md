# @huseyindeniz/cra-template-dapp

![downloads](https://img.shields.io/npm/dw/@huseyindeniz/cra-template-dapp)
![version](https://img.shields.io/npm/v/@huseyindeniz/cra-template-dapp)
![build](https://img.shields.io/github/actions/workflow/status/huseyindeniz/cra-template-dapp/ci.yml)

A create-react-app template specifically designed for decentralized application (dApp) frontend development.

Quick start

```sh
npx create-react-app mydapp --template @huseyindeniz/dapp
cd mydapp
npm start
```

### Are you tired of searching for and configuring numerous React packages? Do you get tired of writing the same boilerplate for each new dApp?

One of the challenges of building applications with pure React is the need to identify and configure a large number of packages to get the desired functionality. This can be time-consuming and error-prone, especially for developers who are new to React or who are building their first dApp application.

The dApp CRA Template helps developers avoid this challenge by including a wide range of preconfigured packages that are ready to use out of the box. This includes packages for core functionality such as routing and state management, as well as packages for specialized features like internationalization. All of these packages are carefully selected and integrated to work seamlessly together, making it easy for developers to build powerful and feature-rich applications without the need to spend time researching and configuring individual packages.

### Benefits of dApp CRA Template?

dApp CRA Template is specifically designed to meet the needs of dApp development. It is built on top of React, just like React based frameworks, but it offers greater flexibility and customization options. With dApp CRA Template, you can take full advantage of the capabilities of React to build fast, scalable, and user-friendly dApps, while also being able to easily integrate with decentralized protocols and technologies. Additionally, dApp CRA Template allows you to host your dApp on decentralized servers, ensuring maximum security and decentralization.

- Decentralized hosting: One of the main benefits of using this template is that it allows you to host your application on decentralized servers, such as IPFS or Swarm. This allows you to build truly decentralized applications that are not reliant on a single centralized server. In contrast, React based frameworks applications require centralized hosting, which can be less secure and more susceptible to censorship.

- Greater flexibility: By using this template, you have more flexibility in terms of the tools and technologies you can use to build your decentralized application. For example, you can use various React libraries and packages to customize the look and feel of your application, and you can choose from a wide range of decentralized storage solutions.

Overall, dApp CRA Template provides an easy-to-use foundation for building decentralized applications with React, and helps developers avoid the difficulties of identifying and configuring lots of packages. It is an ideal choice for developers who want to build high-quality dApps quickly and efficiently.

## Features

- Authentication with Metamask Wallet
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

**React**: React is a popular JavaScript library for building user interfaces. It is fast, efficient, and allows developers to build reusable components that can be easily shared across projects.

**TypeScript**: TypeScript is a typed superset of JavaScript that provides additional type-checking and other features that can help developers catch errors and improve the quality of their code. It is particularly useful in large projects, where the codebase can become complex and difficult to manage.

**Chakra-UI**: Chakra-UI is a component library for building accessible and customizable user interfaces with React. It provides a wide range of prebuilt components that can be easily incorporated into your project, and allows you to easily customize the look and feel of your application.

**React Router**: React Router is a routing library for React applications that allows developers to define and manage routes in a declarative way. This makes it easier to build single-page applications that can navigate between different pages without requiring a full page reload.

**Redux Toolkit**: Redux is a popular state management library for JavaScript applications. It allows developers to manage the state of their application in a predictable and consistent way, making it easier to build complex applications that are easy to maintain and scale. Redux Toolkit is a toolkit for Redux that provides a set of utilities and conventions that make it easier to use Redux in a consistent and efficient way.

**Redux Saga**: Redux Saga is a library that makes it easier to manage side effects (asynchronous logic) in Redux applications. It allows developers to declaratively describe the side effects of their application, making it easier to test and maintain the application's logic.

**React Error Boundary**: React Error Boundaries are a feature of React that allow developers to catch and handle errors that occur in a specific component or its descendants. This can be useful for preventing errors from propagating throughout the application and potentially causing it to crash.

**React Helmet**: React Helmet is a library that allows developers to manage the metadata of a React application, such as the title, description, and keywords, in a declarative way. This can be useful for optimizing the SEO of your application and improving its discoverability.

**I18Next**: I18Next is an internationalization (i18n) library for JavaScript applications. It allows developers to easily translate their application into different languages, making it more accessible to a global audience. The Browser Language Detector is a library that automatically detects the user's language based on the browser settings, allowing the application to display the correct language for the user.

**React Icon All Files**: React Icon All Files is a library that provides a collection of high-quality SVG icons for use in React applications. It includes a wide range of icons, making it easy to find the perfect icon for your application.

**React Cookie Consent**: is a library that makes it easy to implement a cookie consent banner in a React application.

## Getting Started

### Installation

```sh
npx create-react-app mydapp --template @huseyindeniz/dapp
```

### Configuration

TODO: Tutorials and dedicated documentation website...

#### Setting Supported Languages

- Open /src/features/i18n/config.ts
- set supportedLanguages array under the i18nConfig object

#### Adding new pages

- Create a new page under pages folder
- Import your page into usePages.tsx and create a Route for it
- If your page need authentication wrap it with withWalletProtection hoc.

#### Changing site name

- Open /src/features/i18n/translations/en-US/Layout.json
- Change the entries with the keys SITE_NAME and SITE_DESCRIPTION

## Contributions

dApp CRA Template is an open-source project and we welcome contributions from the community. If you have any suggestions, please use the [discussion](https://github.com/huseyindeniz/cra-template-dapp/discussions) tab. If you have any bug reports, please [open an issue](https://github.com/huseyindeniz/cra-template-dapp/issues) or [submit a pull request](https://github.com/huseyindeniz/cra-template-dapp/pulls).

## License

dApp CRA Template is licensed under the [MIT License](./LICENSE).
