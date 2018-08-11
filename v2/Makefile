DOCKER:=$(shell grep docker /proc/self/cgroup)

help:
	@echo "=============== BLOGGER ================="
	@echo "help ................ Show Help"
	@echo "install ............. Install Blogger"
	@echo "run ................. Run Blogger"

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
	node app/app.js
else
	@echo \"make run\" will only work inside docker!!!
endif

# to catch all default targets and do nothing
.DEFAULT: ;

.PHONY: help install run
