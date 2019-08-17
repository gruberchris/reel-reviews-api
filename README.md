# Reel Reviws API

Node Express restful API implementation for [Reel Reviews](https://github.com/gruberchris/ReelReviews).

## Docker

| Environment Variable      | Description         | Default Value         |
| ------------------------- | ------------------- | --------------------- |
| REEL_REVIEWS_API_PORT     | TCP Sevrer Port     | 5000                  |
| REEL_REVIEWS_MONGODB_HOST | MongoDB Host & Port | localhost:27017       |
| REEL_REVIEWS_ALLOW_ORIGIN | CORS Allowed Origin | http://localhost:3000 |

## DockerHub

[chrisgruber/reel-reviews-api](https://hub.docker.com/r/chrisgruber/reel-reviews-api)

`docker pull chrisgruber/reel-reviews-api`

### Example Building This Docker Image

`docker build -t reelreviews-api:dev`

### Example Running This Docker Container Detached

`docker run -d -p 5001:5000 --env REEL_REVIEWS_MONGODB_HOST=[YOUR-HOST-OR-IP:YOUR-TCP-PORT] reelreviews-api:dev`

### Docker Compose

`docker-compose build`

`docker-compose up -d` or `docker-compose up`

### DockerHub

`docker pull chrisgruber/reel-reviews-api`
