import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import PersonPage from "./pages/personDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from './pages/upcomingMoviesPage';
import { QueryClientProvider, QueryClient } from "react-query";
import { createRoot } from "react-dom/client";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PeoplePage from "./pages/peoplePage";
import AuthProvider from "./contexts/authContext.js";
import ProtectedRoutes from "./components/protectedRoutes";
import RecommendMoviesPage from "./pages/recommendMoviesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/page:pagination" element={<HomePage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/movies/favorites/page:pagination" element={<FavoriteMoviesPage />} />
                <Route path="/movies/recommend" element={<RecommendMoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/people/:id" element={<PersonPage />} />
                <Route path="/movies/upcoming/page:pagination" element={<UpcomingMoviesPage />} />
                <Route path="/people/page:pagination" element={<PeoplePage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/page1" />} />
            </Routes>
          </MoviesContextProvider>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);