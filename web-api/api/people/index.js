import express from 'express';
// import { movies, movieReviews, movieDetails } from './moviesData';
// import uniqid from 'uniqid'
import asyncHandler from 'express-async-handler';
import { getPeople, getPerson, getPersonImages, getPersonMovieCredits, getPersonExternalIds } from '../tmdb-api';

const router = express.Router();

router.get('/tmdb/popular/page:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    console.log(page)
    const people = await getPeople(page);
    res.status(200).json(people);
}));

router.get('/tmdb/person/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const person = await getPerson(id);
    res.status(200).json(person);
}));

router.get('/tmdb/person/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const personImages = await getPersonImages(id);
    res.status(200).json(personImages);
}));

router.get('/tmdb/person/:id/movie_credits', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const personMovieCredits = await getPersonMovieCredits(id);
    res.status(200).json(personMovieCredits);
}));

router.get('/tmdb/person/:id/external_ids', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const personExternalIds = await getPersonExternalIds(id);
    res.status(200).json(personExternalIds);
}));

export default router;