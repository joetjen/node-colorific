node_modules: package.json

dependencies: node_modules
	@npm prune
	@npm install
	@npm dedupe

run: dependencies
	@NODE_PATH=lib node src/index.js

test: dependencies
	@npm test

autotest: dependencies
	@npm run-script autotest

watch: dependencies
	@npm watch

start: dependencies
	@npm start

stop: dependencies
	@npm stop

restart: dependencies
	@npm restart

example: dependencies
	@npm run-script example

clean:
	@rm -rf node_modules

install:
	@sudo npm install -g `pwd`

publish:
	@npm publish

help:
	@echo 'Usage: make [options] [target]...'
	@echo ''
	@echo 'Targets:'
	@echo '  dependencies  install package dependencies.'
	@echo '  run           run the package main script.'
	@echo '  test          run the package test script.'
	@echo '  autotest      run the package autotest script.'
	@echo '  watch         run the package watch script.'
	@echo '  start         run the package start script.'
	@echo '  stop          run the package stop script.'
	@echo '  stop          run the package stop script.'
	@echo '  example       run the package example script.'
	@echo '  clean         remove the node_modules subdirectory.'
	@echo '  install       globally install the package on the system.'
	@echo '                [requires sudo rights]'
	@echo '  publish       publish the package.'
	@echo '  help          show this help.'
	@echo ''
	@echo 'For possible options use "make --help".'

.PHONY: dependencies run test example clean install publish help
