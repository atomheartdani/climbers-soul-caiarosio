# Climber's Soul CAI Arosio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

# Getting started

1. Go to project folder and install dependencies:

```sh
npm install
```

2. Launch development server, and open `localhost:4200` in your browser:

```sh
npm start
```

# Project structure

```
dist/                        web app production build
docs/                        project docs and coding guides
src/                         project source code
|- app/                      app components
|  |- shared/                shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- index.html                html entry point
|- main.scss                 global style entry point
+- main.ts                   app entry point
```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Task                                            | Description                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------ |
| `npm start`                                     | Run development server on `http://localhost:4200/`                       |
| `npm run build [-- --configuration=production]` | Lint code and build web app for production in `dist/` folder             |
| `npm test`                                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode |
| `npm run lint`                                  | Lint code                                                                |
| `npm run prettier`                              | Automatically format all `.ts`, `.js` & `.scss` files                    |

When building the application, you can specify the target configuration using the additional flag
`--configuration <name>` (do not forget to prepend `--` to pass arguments to npm scripts).

The default build configuration is `prod`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Additional tools

Tasks are mostly based on the `angular-cli` tool. Use `ng help` to get more help or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).

## Code formatting

All `.ts`, `.js` & `.scss` files in this project are formatted automatically using [Prettier](https://prettier.io),
and enforced via the `test:ci` script.

A pre-commit git hook has been configured on this project to automatically format staged files, using
(pretty-quick)[https://github.com/azz/pretty-quick], so you don't have to care for it.

You can also force code formatting by running the command `npm run prettier`.

# What's in the box

The app template is based on [HTML5](http://whatwg.org/html), [TypeScript](http://www.typescriptlang.org) and
[Sass](http://sass-lang.com). The translation files use the common [JSON](http://www.json.org) format.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
