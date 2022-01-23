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
    totalPages: null,
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
            state.totalPages = action.payload.totalPages;
            state.page += 1;
        },
        resetList: (state) => {
            state.movies = [...initialState.movies];
            state.genre = null;
            state.genreId = null;
            state.page = 0;
            state.totalPages = 0;
            state.status = 'idle';
            state.error = null;
            state.url = null;
            state.ordenamiento = null;
        },
        setCmsData: (state, action) => {
            state.ordenamiento = action.payload.ordenamiento;
            state.genre = action.payload.genre;
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

export const fetchMovieListByGenre = genre => async (dispatch, getState) => {
    let {movieList: state} = getState();
    if(state.status === 'loading') return;

    let page = state.page;
    let totalPages = state.totalPages;

    if (state.status === 'error' || genre !== state.genre) {
        dispatch(resetList())
        page = 0;
        totalPages = null;
    };

    if(totalPages && page === totalPages) return;

    dispatch(setStatus('loading'));

    try {
        const data = await getDataFromCMS(genre);
        const {url, ordenamiento} = parseDataFromCMS(data);
        const genreId = getGenreIdFromUrl(url);
        const parsedOrderOptions = parseOrderOptions(ordenamiento);
        dispatch(setCmsData({url, ordenamiento: parsedOrderOptions, genreId, genre}))

        const options = {from: page * 50 || 0};
        const movieListResponse = await getMovieListByGenreId(genreId, options);
        const {total, movies} = parseMovieListResponse(movieListResponse);
        
        dispatch(addMovies({movies, totalPages: Math.ceil(total / 50)}));
        dispatch(setStatus('complete'));
    } catch(err) {
        console.error(err);
        dispatch(setError(err.statusText))
    }
}

export const useMovieList = () => useSelector(state => state.movieList);

export default movieListSlice.reducer;