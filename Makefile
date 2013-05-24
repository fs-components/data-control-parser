
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

node_modules: package.json
	npm install --dev

test: node_modules build
	./node_modules/.bin/karma start test/karma.conf.js

test-web: node_modules build
	./node_modules/.bin/karma start test/karma-chrome.conf.js

.PHONY: clean test
