build:
	zip dist/wix-blocker src/* popup/* popup/**/* service.js manifest.json images/*

clean:
	rm -f dist/wix-blocker.zip
