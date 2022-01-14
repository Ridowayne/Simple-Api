const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodeFetch = require('node-fetch');

dotenv.config({ path: './config.env' });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { createApi } = require('unsplash-js');

const Photo = require('./models/photoModels');

// Defining the database with the authoraization password
const DB = process.env.MONGODB.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
);

// connecting the to the database
mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('Api connected to the Database sucessfully'));

// setting up the unsplash-api
const unsplash = createApi({
  accessKey: process.env.DB_ACCESS_KEY,
  fetch: nodeFetch,
});

// a get request route to get the photos from unsplash
app.get('/', async (req, res) => {
  try {
    let searchQuery = req.originalUrl;

    // let searchQuery = 'nigeria';
    const search = await unsplash.search.getPhotos({
      query: searchQuery,
      page: 1,
      perPage: 10,
    });
    // .then((res) => console.log(res.response.results));
    res.status(200).json({
      status: 'succes',
      data: {
        search,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send('Unable to get requested route');
  }
});

app.post('/', async (req, res) => {
  console.log('%%%%%%%%%%%%%%%%%%%%%' + req.body);
  try {
    const firstPhoto = await Photo.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        Photo: firstPhoto,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).send('Unable to get requested route');
  }
});

//   server to run in either 9000 or as defined in the the enviroment file
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`app running on ${port}...`);
});
