BIN = ./node_modules/.bin
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.min.js)

# build: $(LIB) dependencies

run: dependencies
	@NODE_PATH=lib node index.js

minify: $(LIB) dependencies

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
	@rm -rf lib

install:
	@sudo npm install -g `pwd`

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
	@echo '  run           run the package main script.'
	@echo '  minify        produce minified versions of the sources.'
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
	@echo '  dependencies  install package dependencies.'
	@echo '  help          show this help.'
	@echo ''
	@echo 'For possible options use "make --help".'

node_modules: package.json

lib/%.min.js: src/%.js
	$(call uglifyjs)

define uglifyjs
	@mkdir -p $(@D)
	$(BIN)/uglifyjs --mangle sort=true,toplevel=true \
	                --reserved '$,_,require,exports,modules' \
	                --compress \
	                --screw-ie8 \
	                --output $@ \
	                $<
endef

.PHONY: run minify test example clean install publish dependencies help
