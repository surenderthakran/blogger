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
ifeq ($(NODE_ENV), dev)
	@echo Starting gulp watch in background...
	@nohup ./node_modules/gulp/bin/gulp.js watch &
endif
	@echo Starting nodejs...
	@node app/index.js

clean:
	@rm -rf node_modules

# to catch all default targets and do nothing
.DEFAULT: ;

.PHONY: help install run exec clean
