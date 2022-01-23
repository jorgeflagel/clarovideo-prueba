import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

// SERVICES
import getDataFromCMS from '../services/getDataFromCMS';
import getMovieListByGenreId from '../services/getMovieListByGenreId';

// UTILS
import getGenreIdFromUrl from '../utils/getGenreIdFromUrl';
import parseDataFromCMS from '../utils/parseDataFromCMS';
import parseMovieListResponse from '../utils/parseMovieListResponse';
import parseOrderOptions from '../utils/parseOrderOptions';

const initialState = {
    status: 'idle',
    movies: [],
    page: 0,
    total: 0,
    error: null,
    genre: null,
    genreId: null,
    url: null,
    ordenamiento: null,
}

export const movieListSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        addMovies: (state, action) => {
            state.movies = [...state.movies, ...action.payload.movies];
            state.total = action.payload.total;
            state.page += 1;
        },
        resetList: (state) => {
            state = initialState;
        },
        setCmsData: (state, action) => {
            state.ordenamiento = action.payload.ordenamiento;
            state.genreId = action.payload.genreId;
            state.url = action.payload.ordenamiento;
        },
        setError: (state, action) => {
            state = { ...initialState, error: action.payload };
        }
    },
})

// Action creators are generated for each case reducer function
export const { setStatus, setCmsData, addMovies, resetList, setError } = movieListSlice.actions;

export const fetchMovieListByGenre = genre => async (dispatch, state) => {
    if (genre === state.genre && state.status !== 'error') return
    if (state.status !== 'idle') dispatch(resetList());

    dispatch(setStatus('loading'));

    try {
        const data = await getDataFromCMS(genre);
        const {url, ordenamiento} = parseDataFromCMS(data);
        const genreId = getGenreIdFromUrl(url);
        const parsedOrderOptions = parseOrderOptions(ordenamiento);
        dispatch(setCmsData({url, ordenamiento: parsedOrderOptions, genreId}))
        const movieListResponse = await getMovieListByGenreId(genreId);
        const movieList = parseMovieListResponse(movieListResponse);
        dispatch(addMovies({...movieList}));
    } catch(err) {
        console.error(err);
        dispatch(setError(err.statusText))
    }
}

export const useMovieList = () => useSelector(state => state.movieList);

export default movieListSlice.reducer;