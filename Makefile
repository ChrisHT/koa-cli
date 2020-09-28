
tag=0.0.1

deploy:
	@echo "building docker image $(images-name):$(tag)"
	docker build -t $(images-name):$(tag)" .
	docker push $(images-name):$(tag)"
