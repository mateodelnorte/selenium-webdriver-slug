DEBUG?=

MOCHA_CMD=./node_modules/mocha/bin/mocha
NODE_ENV?=development
NODE_CMD?=node
NPM_CMD?=npm
PATH:=$(PATH):`pwd`/vendor/chromedriver/darwin:`pwd`/vendor/chromedriver/linux:`pwd`/vendor/chromedriver/windows:

SELENIUM_SERVER_JAR?=./vendor/selenium/selenium-server-standalone-2.37.0.jar
SELENIUM_BROWSER?=phantomjs

SITE_URL=http://localhost:3000/

start: 	
	NODE_ENV=$(NODE_ENV) \
	$(NODE_CMD) --debug app.js

test:
	DEBUG= \
	$(MOCHA_CMD) ./test -R spec -t 5000;

test-debug:
	DEBUG=$(DEBUG) \
	$(MOCHA_CMD) ./test -R spec -t 5000;

# Functional Test Targets. 
# To override SELENIUM_BROWSER, follow example 'make SELENIUM_BROWSER=chrome,firefox test-functional' for any target

test-selenium:
	SELENIUM_SERVER_JAR=$(SELENIUM_SERVER_JAR) \
	SELENIUM_BROWSER=$(SELENIUM_BROWSER) \
	$(NPM_CMD) test selenium-webdriver

test-functional:
	$(MAKE) \
	DEBUG= \
	test-functional-debug

test-functional-all:
	$(MAKE) \
	DEBUG= \
	SELENIUM_BROWSER=phantomjs,chrome,firefox \
	test-functional-debug

test-functional-debug:
	DEBUG=$(DEBUG) \
	PATH=$(PATH) \
	SELENIUM_SERVER_JAR=$(SELENIUM_SERVER_JAR) \
	SELENIUM_BROWSER=$(SELENIUM_BROWSER) \
	SITE_URL=$(SITE_URL) \
	$(MOCHA_CMD) ./test-functional --recursive -R spec -t 15000

.PHONY: test test-functional