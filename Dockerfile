FROM node:16-alpine

# install dependencies
WORKDIR /app
COPY . .

EXPOSE 3000
ENTRYPOINT ["/bin/sh", "/app/startScript.sh"]