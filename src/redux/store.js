import { configureStore } from '@reduxjs/toolkit';
import { movieListReducer, movieReducer } from './reducers';

export const store = configureStore({
  reducer: {
      movieList: movieListReducer,
      movie: movieReducer,
  },
})