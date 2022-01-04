const express = require('express');
const nodeFetch = require('node-fetch');
require('dotenv').config({ path: './config.env' });

const app = express();

const { createApi } = require('unsplash-js');

// setting up the unsplash-api
const unsplash = createApi({
  accessKey: process.env.DB_ACCESS_KEY,
  fetch: nodeFetch,
});

// a get request route to get the photos from unsplash
app.get('/', async (req, res) => {
  try {
    let searchQuery = req.originalUrl

    // let searchQuery = 'nigeria';
    const search = await unsplash.search.getPhotos({
      query: searchQuery,
      page: 1,
      perPage: 10,
    });
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

//   server to run in either 9000 or as defined in the the enviroment file
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`app running on ${port}...`);
});
