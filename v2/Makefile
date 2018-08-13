DOCKER:=$(shell grep docker /proc/self/cgroup)

NODEMON = ./node_modules/nodemon/bin/nodemon.js

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
	@$(NODEMON) -e js,html app/app.js
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
	docker exec -it blogger_v2_container ${CMD}
else
	@echo 'make command' needs arguments!!
endif
endif

# to catch all default targets and do nothing
.DEFAULT: ;

.PHONY: help install run
