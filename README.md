To launch an application, simply open "index.html" in your browser.

To launch e2e tests:
	1) npm i
	2) set up a simple http server on application root (e.g. "python -m http.server")
	3) set up webdriver server via "webdriver update && webdriver start"
	4) execute "protractor e2e/conf.js" 