const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp')
    .then(() => {
        console.log("Connection Open")
    })
    .catch((e) => {
        console.log("Error Dude")
        console.log(e)
    })

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

//Make a model using the above shema
//Pass in a string for the name of the model 'Movie'. Must be singular. Then pass in schema
//It will make plural the model name 'Movie' and create a collection called 'movies'
//Saving it to a variable called Movie makes it a class. 
const Movie = mongoose.model('Movie', movieSchema);
//const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'});

  Movie.insertMany ([
      {title: 'Lord of the Rings', year: 2001, score: 9.9, rating: 'PG-13'},
      {title: 'The Hobbit', year: 2013, score: 9.8, rating: 'PG-13'},
      {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
      {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
      {title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
      {title: 'Raya', year: 2021, score: 7.3, rating: 'PG'},
      {title: 'The Matrix', year: 1999, score: 8.7, rating: 'R'},
      {title: 'Fantastic 4', year: 2005, score: 6.2, rating: 'PG-13'},
      {title: 'Tron', year: 2010, score: 6.8, rating: 'PG-13'}
  ])
  .then(data => {
      console.log('Movie data uploaded!');
      console.log(data);
  })
  .catch(e => {
      console.log("An Error Did Occur", e)
  })