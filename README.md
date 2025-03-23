# Climber's Soul CAI Arosio

This is the frontend code for [CAI Arosio](https://www.caiarosio.it/)'s climbing gym "[Climber's Soul](https://caiarosio.it/climberssoul/)"

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.x

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
src/                         project source code
|- app/                      app components
|  |- @shared/               shared module (common components, directives and pipes)
|  |- app.component.*        app root component
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- index.html                html entry point
|- main.ts                   app entry point
+- styles.scss               global style entry point
```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Task                     | Description                                                          |
| ------------------------ | -------------------------------------------------------------------- |
| `npm start`              | Run dev server on `http://localhost:4200/`                           |
| `npm run build`          | Build web app for prod environment in `dist/` folder                 |
| `npm run analyze`        | Build web app for dev environment and generate the `stats.json` file |
| `npm run prettier`       | Automatically format all `.ts`, `.js` & `.scss` files                |
| `npm run prettier:check` | Check for style issues for all `.ts`, `.js` & `.scss` files          |

When you generate the `stats.json` file you can analyze the results with https://esbuild.github.io/analyze/

## Development server

Run `npm start` for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`

For more info check the `ng generate` [docs](https://angular.dev/cli/generate)

## Code formatting

All `.ts`, `.js` & `.scss` files in this project are formatted automatically using [Prettier](https://prettier.io).

A pre-commit git hook has been configured on this project to automatically format staged files, using
[husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/lint-staged/lint-staged), so you don't have to care for it

You can also force code formatting by running the command `npm run prettier`

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page
