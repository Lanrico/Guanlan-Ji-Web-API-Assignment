import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getUserRecommend } from "../../api/web-api";
import { AuthContext } from "../../contexts/authContext";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const context1 = useContext(AuthContext);
  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
    // const r = await getUserRecommend(context1.userName)
    // context1.setRecommendMovies(r);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;