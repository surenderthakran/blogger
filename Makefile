DOCKER:=$(shell grep docker /proc/self/cgroup)

CMD:=

help:
	@echo "=============== BLOGGER ================="
	@echo "help ................ Show Help"
	@echo ""
	@echo "Make rules to be run from outside a docker container."
	@echo "command ............. Runs generic commands inside the container."
	@echo "                      Usage: make command CMD='<command to run>'"
	@echo "                      ex: make command CMD='npm install chai --save-dev'"
	@echo ""
	@echo "Make rules to be run from inside a docker container."
	@echo "install ............. Installs Blogger"
	@echo "run ................. Runs Blogger"

install:
ifdef DOCKER
	@echo Running \"make install\"...
	npm install
else
	@echo \"make install\" will only work inside docker!!!
endif

run:
ifdef DOCKER
	@echo Running \"make run\"...
ifeq ($(NODE_ENV), production)
	node app/app.js
else
	@echo Starting gulp watch in background...
	@nohup npx gulp watch &
	@sleep 1
	@echo Starting server with nodemon...
	@npx nodemon --watch app --ignore app/views --ignore app/public --delay 0.5 app/app.js
endif
else
	@echo \"make run\" will only work inside docker!!!
endif

command:
ifdef DOCKER:
	@echo 'make command' will NOT work inside docker!!!
else
ifdef CMD
	@echo Running \"${CMD}\" inside docker...
	docker exec -it blogger_container ${CMD}
else
	@echo 'make command' needs arguments!!
endif
endif

# to catch all default targets and do nothing
.DEFAULT: ;

.PHONY: help install run
