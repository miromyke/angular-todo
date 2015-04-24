## Simple Todo application on Angular

#### To launch an application, execute `npm i && npm start` and simply open "index.html" in your browser.
##### Note that `npm start` triggers `gulp watch` task, so terminate the process if you don't need watchers to be active.

#### For development purposes, execute `node inject_hooks.js` to install pre-commit hooks. Use `gulp watch` to start watchers.

#### To launch e2e tests:

* `npm i`
* set up a simple http server on application root (e.g. `python -m http.server`)
* update and set up webdriver server via `webdriver update && webdriver start` from app root as well