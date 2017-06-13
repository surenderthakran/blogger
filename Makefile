DOCKER:=$(shell grep docker /proc/self/cgroup)

GULP = ./node_modules/gulp/bin/gulp.js
NODEMON = ./node_modules/nodemon/bin/nodemon.js

help:
	@echo "=============== BLOGGER ================="
	@echo "help ................ Show Help"
	@echo "install ............. Install Blogger"
	@echo "run ................. Run Blogger"
	@echo "clean ............... Clean Installation"

install:
	@echo Running make install...
	@npm config set unsafe-perm true
	@npm install

run:
	@echo Running make run...
ifdef DOCKER
	@echo Inside docker container...
ifeq ($(NODE_ENV), dev)
	@echo Setting up development environment...
	@sleep 10
	@echo Starting gulp watch in background...
	@nohup $(GULP) watch &
	@echo Starting server via nodemon...
	@$(NODEMON) -e js,html -i 'app/views/*' app/index.js
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

.PHONY: help install run clean
