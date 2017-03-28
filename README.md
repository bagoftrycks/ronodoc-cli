[![GitHub version](https://badge.fury.io/gh/bagoftrycks%2Fronodoc-cli.svg)](https://badge.fury.io/gh/bagoftrycks%2Fronodoc-cli)
[![Build Status](https://travis-ci.org/bagoftrycks/ronodoc-cli.svg?branch=master)](https://travis-ci.org/bagoftrycks/ronodoc-cli)
[![Coverage Status](https://coveralls.io/repos/github/bagoftrycks/ronodoc-cli/badge.svg?branch=master)](https://coveralls.io/github/bagoftrycks/ronodoc-cli?branch=master)
[![dependencies Status](https://david-dm.org/bagoftrycks/ronodoc-cli/status.svg)](https://david-dm.org/bagoftrycks/ronodoc-cli)
[![devDependencies Status](https://david-dm.org/bagoftrycks/ronodoc-cli/dev-status.svg)](https://david-dm.org/bagoftrycks/ronodoc-cli?type=dev)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)
[![NPM Version](https://img.shields.io/badge/npm-3.10.10-blue.svg)](https://img.shields.io/badge/npm-3.10.10-blue.svg)
[![Node Version](https://img.shields.io/badge/node-v6.10.1-blue.svg)](https://img.shields.io/badge/node-v6.10.1-blue.svg)

# Ronodoc CLI :tophat:

A CLI to bootstrap app that **showcase UI components** and have your own UI set of components.

It generates a complete project structure builded with:
- webpack
- react
- material-ui
- flexboxgrid

With **ronodoc-cli**, you could have an app that showcase not only **UI components**
but also the ability to expose each **components API**, a **preview of the code** and
how **it looks like**.

Plus, if you use the *build command* from the generated project,
you will have a **lib** of all your UI components and of course the showcase app for production.

Basically, you could see this project like the beginning to achieve something like:
- http://www.material-ui.com
- https://angular.io/docs/ts/latest/
- etc

---

Below is the generated code after running **ronodoc-cli**

```
|project/
        |__tests__/
        |demo/
              |src/
                  |components/
                              |_layout/
                              |app/
                              |hodor/
                              |markdownothor/
                              |proptypes-descripthor/
                  |pages/
                  |index.html
                  |main.js
              |webpack.config.dev.js
              |webpack.config.prod.js
              |webpack.server.js
        |src/
        |LICENCE.md
        |package.json
```

---

There is also a command to generate next UI component `ronodoc-cli -c component_name create`
which will automatically create and insert the new component structure into this app.

**You only need to work on your component as you which, no more copy/paste everywhere to setup the component (add it into the router, create it in src/ etc..).**

### Installing

The recommand way is to install it globally.

```
npm install -g git+ssh://git@github.com/bagoftrycks/ronodoc-cli.git
```

:warning: This project is not yet publish, so it normal to use the github url.

## Getting Started

To create new project:

```js
ronodoc-cli -a "myUIComponents" create
cd myUIComponents/
```

:warning: it can take some times as it will install also the dependencies
and start the project for you.

---

To start with a new basic component

```js
// make sure to be into your project folder
cd myUIComponents/
ronodoc-cli -c "componentName" create
```

**You can start editing your component in myUIComponents/src/componentName**

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/bagoftrycks/ronodoc-cli/tags).

## Authors

* **Sovanna Hing** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

How to create a CLI comes from:
- http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm
- https://developer.atlassian.com/blog/2015/11/scripting-with-node/

The flow on how to do things is inspired from:
- https://github.com/facebookincubator/create-react-app
- https://material.angularjs.org/latest/

The UI idea, design etc come form of course `material-ui`:
- http://www.material-ui.com
- https://material.angularjs.org/latest/
