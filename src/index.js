const dotenv = require('dotenv');
const Express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = Express();
const port = process.env.REEL_REVIEWS_API_PORT || '5000';
const allowedOrigin =
  process.env.REEL_REVIEWS_ALLOW_ORIGIN || 'http://localhost:3000';
const mongodb =
  process.env.REEL_REVIEWS_MONGODB_HOST || 'http://localhost:27017';
const mongodbUrl = `mongodb://${mongodb}/reelreviews`;

console.log(`CORS Allowed Origin: ${allowedOrigin}`);

Mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000
}).catch(error => {
  console.log(error);
});
Mongoose.connection.on('error', error => console.log(error));
Mongoose.connection.on('connected', () =>
  console.log(`Mongoose connected to ${mongodbUrl}`)
);
Mongoose.connection.on('connecting', () =>
  console.log(`Connecting to ${mongodbUrl}`)
);
Mongoose.connection.on('close', () =>
  console.log(`Connection with ${mongodbUrl} is closed`)
);
Mongoose.connection.on('disconnecting', () =>
  console.log(`Disconnecting from ${mongodbUrl}`)
);
Mongoose.connection.on('disconnected', () =>
  console.log(`Mongoose has disconnected from ${mongodbUrl}`)
);
Mongoose.connection.on('reconnected', () =>
  console.log(`Reconnected to ${mongodbUrl}`)
);
Mongoose.connection.on('reconnectFailed', () =>
  console.log(`Attempt(s) to reconnect to ${mongodbUrl} has failed!`)
);

process.on('SIGINT', () => {
  Mongoose.connection.close(() => {
    console.log(
      `Mongoose disconnection to ${mongodbUrl} occurred due to application termination.`
    );
    process.exit(0);
  });
});

app.use(cors({ origin: allowedOrigin }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

const FavoriteModel = Mongoose.model('favorite', {
  imdbID: String,
  Title: String,
  Year: String,
  Poster: String,
  review: String,
  rating: Number
});

app.post('/favorite', async (request, response) => {
  try {
    let favoriteModel = new FavoriteModel(request.body);
    let result = await favoriteModel.save();
    response.send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.get('/favorite', async (request, response) => {
  try {
    let favoriteModel = await FavoriteModel.find().exec();
    response.send(favoriteModel);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.get('/favorite/:id', async (request, response) => {
  try {
    let favoriteModel = await FavoriteModel.findById(request.params.id).exec();
    response.send(favoriteModel);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.put('/favorite/:id', async (request, response) => {
  try {
    let favoriteModel = await FavoriteModel.findById(request.params.id).exec();
    favoriteModel.set(request.body);
    let result = await favoriteModel.save();
    response.send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.delete('/favorite/:id', async (request, response) => {
  try {
    let favoriteModel = await FavoriteModel.deleteOne({
      _id: request.params.id
    }).exec();
    response.send(favoriteModel);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Listening at :${port}...`);
});
