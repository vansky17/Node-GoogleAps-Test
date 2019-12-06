const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
app.use(morgan('common'));
app.use(cors());

const googleapps = require('./playstore.js');

app.get('/apps', (req, res) => {
  const { search = "", sort, genre } = req.query;

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of Rating or App');
    }
  }

  let results = googleapps
        .filter(googleapp =>
          googleapp
              ["App"]
              .toLowerCase()
              .includes(search.toLowerCase()));

  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  if(genre){
    if (! ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)){
      return res
        .status(400)
        .send("Genre must be on of the following: 'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'");
    } 
  }
  if(genre){
    results = results.filter(result => result["Genres"].includes(genre));
  }
  res
    .json(results);
});
module.exports = app;


 