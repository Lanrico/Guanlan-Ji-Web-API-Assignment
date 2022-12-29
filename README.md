# Assignment 2 - Web API.

Name: Guanlan Ji
Student number: 20099881

## Features.

 + More new API routes, including parameterised URL.
 + More new TMDB API routes with parameterised URL.
 + Almost fully React integration of GET and POST data to API.
 + New Nested Document in MongoDB.
 + Advanced authentication with rich functions.
 + New protected routes.
 + New express middleware such as error handling and complete error log for each api.
 + New validation using regular expressions.
 + Complete Swagger API documentation.
 + Simple recommend algorithm to implement a recommender.

## Setup requirements.

No setup requirements

## API Configuration

 + create a .env file in the web-api folder as below:
    ______________________
    NODE_ENV=development
    PORT=8080   
    HOST=localhost
    MONGO_DB=YourMongoURL
    SEED_DB=true
    SECRET=YourJWTSecret
    REACT_APP_TMDB_KEY=YourTmdbKey
    ______________________

## API Design

The API design is on the Swaggerhub where you can find a complete API documentation

[Swaggerhub](https://app.swaggerhub.com/apis-docs/Lanrico/Web-API-CA/1.0.0#/)

## Security and Authentication

 In web-api
 - '/api/movies/tmdb' and '/api/people' are protected by passport/sessions.
 In React
 - The routes below are all protected
    /reviews/:id
    /movies/favorites/page:pagination
    /movies/:id
    /people/:id
    /movies/upcoming/page:pagination
    /movies/recommend
    /people/page:pagination
    /reviews/form
## Integrating with React App

Views use Web instead of TMDB API:
+ /users | POST | Login and register in the homepage, and related to the protected routes
+ /users/:username/favourites | GET | The favourite page shows the movies get from this api
+ /users/:username/favourites | POST | The addToFavourite button in the movie card post a movie to this api
+ /users/:username/favourites/remove | POST | The removeFromFavourte button in the movie card post a movie to this api to remove the movie
+ /users/:username/recommendation | GET | The recommend page use the movie list return from this api
+ /genres/tmdb/genres | GET | In each page's filtercard
+ /movies/tmdb/discover/page:page | GET | The home page movie list
+ /movies/tmdb/upcoming/page:page | GET | The upcoming page movie list
+ /movies/tmdb/movie/:id | GET | The movie detailed page
+ /movies/tmdb/movie/:id/images | GET | The movie detailed page
+ /movies/tmdb/movie/:id/reviews | GET | The movie review page
+ /trending/tmdb/:type/:time_window | GET | The home page's and people page's trending bar
+ /people/tmdb/popular/page:page | GET | The people page movie list
+ /people/tmdb/person/:id | GET | The person detailed page
+ /people/tmdb/person/:id/images | GET | The person detailed page
+ /people/tmdb/person/:id/movie_credits | GET | The person detailed page
+ /people/tmdb/person/:id/external_ids | GET | The person detailed page

Updates of the React App:
+ When access a protected page, the page will show a warning information and a link to login
+ The movies in favourites will have a red heart just after a user login, and disappear just after the user logout.
+ Of course when a user haven't sign in, he can't see the addToFavourite button in the movie card 
+ A more complete sign up and sign in function, the error message is different due to different types of invalid input
+ A real-time response recommand page, its movie list is caculated by a simple algorithm using the users favourites.

## Independent learning (if relevant)

The API "/users/{id}/recommendation " implements a simple recommender, the flow of algorithm of it is as follows:
1. Get the movie list of the user's favourites, and extract the genres of them.
2. Count the number of the occurrence of each genre, then find the maximum one's genre id.
3. Use the genre id to query movies and get the result from the top 20 trending movies.
In this way the user can get recommend movie by his favourites and the trending movies