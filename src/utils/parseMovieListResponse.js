// Function that returns the list of movies and total of movies for a specific genre.
// It requires as a parameter the reponse object that is returned from the function getMovieListByGenreId.
// It returns an object = {movies, total}
// If it doesn't find movies, it returns {movies: [], total: 0}

const parseMovieListResponse = (data) => {
    try {
        const {groups, total} = data.response;
        return {movies: groups, total}

    } catch (err) {
        console.error(err);
        return {movies: [], total: 0}
    }
}

export default parseMovieListResponse;