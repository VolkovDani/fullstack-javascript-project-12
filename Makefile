build:
	rm frontend/build -rf
	npm run build

install:
	npm ci
	make -C frontend install

start:
	npm start

testbuild:
	rm frontend/build -rf
	npm run build

renderbuild:
	make install
	make -C frontend install
	rm frontend/build -rf
	npm run build