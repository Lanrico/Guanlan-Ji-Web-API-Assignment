import React, { useContext, useState } from "react";
import { addMovieReview, addToUserFavourites, getUserFavourites, removeFromUserFavourites } from "../api/web-api";
import { AuthContext } from "./authContext";
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const context = useContext(AuthContext);
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [mustWatch, setMustWatch] = useState( [] ) 

  const setUserFavorites = (username) => {
    getUserFavourites(username).then((response) => {
      if (response) setFavorites(response);
    });
  }

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
      addToUserFavourites(context.userName, movie.id)
    }
    else{
      newFavorites = [...favorites];
    }

    setFavorites(newFavorites)
  };

  const addToMustWatch = (movie) => {
    let newMustWatch = [];
    if (!mustWatch.includes(movie.id)){
      newMustWatch = [...mustWatch, movie.id];
    }
    else{
      newMustWatch = [...mustWatch];
    }
    setMustWatch(newMustWatch)
  };

  const addReview = (movie, author, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ))
    removeFromUserFavourites(context.userName, movie.id)
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        setUserFavorites,
        addToFavorites,
        removeFromFavorites,
        addToMustWatch,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;