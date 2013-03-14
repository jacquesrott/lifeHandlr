PUBLIC	=	public/js
BUNDLE	=	bundle.js
MAIN	=	main.js


all: client server

client:
	browserify $(PUBLIC)/$(MAIN) -o $(PUBLIC)/$(BUNDLE)

server:
	node app.js

