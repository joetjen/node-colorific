run: node_modules
	@NODE_PATH=lib node index.js

node_modules: package.json
	@npm install
	@npm dedupe

clean:
	@rm -rf node_modules

npm: node_modules

install:
	@npm install -g `pwd`

link:
	@npm link

publish:
	@npm publish

test:
	@npm test

example:
	@npm run-script example

.PHONY: run clean install npm link test example
