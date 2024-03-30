build:
	make install
	make -C frontend install
	rm frontend/build -rf
	npm run build

install:
	npm ci

start:
	npm start

testbuild:
	rm frontend/build -rf
	npm run build