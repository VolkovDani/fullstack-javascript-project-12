lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

deploy:
	git push heroku main

start-backend:
	npm start

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	make install
	rm -rf frontend/build
	npm run build
