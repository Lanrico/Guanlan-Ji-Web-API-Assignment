import React, { useContext } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const HomePage = (props) => {
  const context = useContext(AuthContext);

  const { pagination } = useParams();

  const { data, error, isLoading, isError } = useQuery(
    ["discover", pagination],
    getMovies
  );

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  // const data = await getMovies(pagination);
  // console.log(data)
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return context.isAuthenticated ?<AddToFavoritesIcon movie={movie} /> : null
      }}
      page=""
      pagination={pagination}
      total_pages={data.total_pages}
    />
  );
};
export default HomePage;