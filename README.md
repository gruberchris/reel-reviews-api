# Reel Reviws API

Node Express restful API implementation for [Reel Reviews](https://github.com/gruberchris/ReelReviews).

## Docker

| Environment Variable     | Description                 | Default Value                   |
| ------------------------ | --------------------------- | ------------------------------- |
| REEL_REVIEWS_API_PORT    | TCP Sevrer Port             | 5000                            |
| REEL_REVIEWS_MONGODB_URL | MongoDB URL With Collection | mongodb://localhost/reelreviews |

### Example Building This Docker Image

`docker build -t reelreviews-api:dev`

### Example Running This Docker Container Detached

`docker run -d -p 5001:5000 --env REEL_REVIEWS_MONGODB_URL=mongodb://YOUR-HOST-OR-IP/reelreviews reelreviews-api:dev`
