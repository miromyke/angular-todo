## TodoApp

To launch an application, execute `npm i` and simply open "index.html" in your browser.

Application has `gulp watch` task set up to recompile JavaScript and LESS to `build/app.js` and `build/app.css` respectively.

##### To launch e2e tests:

* `npm i`
* set up a simple http server on application root (e.g. `python -m SimpleHTTPServer` on Unix)
* update and set up webdriver server via `webdriver update && webdriver start` from app root as well
* either execute `protractor e2e/conf.js` manually or just wait for it to eventually be executed as a pre-commit hook