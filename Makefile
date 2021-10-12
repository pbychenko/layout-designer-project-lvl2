install:
	npm install

lint:
	npx stylelint ./src/css/*.css
	npx htmlhint ./src/*.html

deploy:
	npx surge ./src/

convertstyles:
	sass ./src/scss/app.scss ./src/css/main.css