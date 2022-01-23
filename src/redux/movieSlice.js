import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import getMovieById from '../services/getMovieById';
import parseMovieResponse from '../utils/parseMovieResponse';

const initialState = {
    status: 'idle',
    movieId: null,
    movie: null,
    error: null,
}

export const movieSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setMovie: (state, action) => {
            state.movie = action.payload;
        },
        setError: (state, action) => {
            state = { ...initialState, error: action.payload };
        }
    },
})

// Action creators are generated for each case reducer function
export const { setStatus, setMovie, setError } = movieSlice.actions;

export const fetchMovieById = movieId => async (dispatch, state) => {
    if (movieId === state.movieId && !state.error) return;
    dispatch(setStatus('loading'));
    try {
        const data = await getMovieById(movieId);
        const parsedMovie = parseMovieResponse(data)
        dispatch(setMovie(parsedMovie));
        dispatch(setStatus('complete'))
    } catch (err) {
        dispatch(setError(err.statusText));
        dispatch(setStatus('error'))
    }    
}

export const useMovie =  () => useSelector(state => state.movie);


export default movieSlice.reducer;