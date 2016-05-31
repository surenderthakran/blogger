DOCKER:=$(shell grep docker /proc/self/cgroup)

help:
	@echo "=============== BLOGGER ================="
	@echo "help ................ Show Help"
	@echo "install ............. Install Blogger"
	@echo "run ................. Run Blogger"
	@echo "clean ............... Clean Installation"

install:
	@echo Running make install...
	@npm config set unsafe-perm true
	@npm install --prefix ./ app/

run:
	@echo Running make run...
ifdef DOCKER
	@echo Inside docker container...
ifeq ($(NODE_ENV), dev)
	@echo Setting up development environment...
	@sleep 10
	@echo Starting gulp watch in background...
	@nohup ./node_modules/gulp/bin/gulp.js watch &
	@echo Starting gulp watch in background...
	@./node_modules/nodemon/bin/nodemon.js -e js,html app/index.js
else
	@echo Starting nodejs...
	@node app/index.js
endif
else
	@echo Starting nodejs...
	@node app/index.js
endif


clean:
	@rm -rf node_modules

# to catch all default targets and do nothing
.DEFAULT: ;

.PHONY: help install run exec clean
