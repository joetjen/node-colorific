SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.min.js)

# build: $(LIB) dependencies

example: dependencies
	@npm run-script example

test: dependencies
	@npm test

autotest: dependencies
	@npm run-script autotest

clean:
	@rm -rf node_modules

publish:
	@npm publish

dependencies: node_modules
	@npm prune
	@npm install
	@npm dedupe

help:
	@echo 'Usage: make [options] [target]...'
	@echo ''
	@echo 'Targets:'
	@echo '  test          run the package test script.'
	@echo '  autotest      run the package autotest script.'
	@echo '  example       run the package example script.'
	@echo '  clean         remove the node_modules subdirectory.'
	@echo '  install       globally install the package on the system.'
	@echo '                [requires sudo rights]'
	@echo '  publish       publish the package.'
	@echo '  dependencies  install package dependencies.'
	@echo '  help          show this help.'
	@echo ''
	@echo 'For possible options use "make --help".'

node_modules: package.json

.PHONY: example test autotest clean publish dependencies help
