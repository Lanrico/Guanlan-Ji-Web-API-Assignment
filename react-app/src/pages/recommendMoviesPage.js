import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries, useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { getUserRecommend } from "../api/web-api";
import { AuthContext } from "../contexts/authContext";

const RecommendMoviesPage = () => {
  const context = useContext(AuthContext);
  const r = getUserRecommend(context.userName).then((response) => {
    context.setRecommendMovies(response);
  })
  
  // console.log(context.recommendMovies)
  // const { data, error, isLoading, isError } = useQuery(["recommend", context.userName], getUserRecommend);

  // if (isLoading) {
  //   return <Spinner />
  // }

  // if (isError) {
  //   return <h1>{error.message}</h1>
  // }

  return (
    <PageTemplate
      title="Recommend Movies"
      movies={context.recommendMovies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
      pagination={1}
      page="/movies/recommand"
    />
  );
};

export default RecommendMoviesPage;