all:
	jekyll build

beta:
	./deploy.sh beta

prod:
	./deploy.sh prod

clean:
	rm -rf _site
