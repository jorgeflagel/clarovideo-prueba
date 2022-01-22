// Function that returns the list of movies and total of movies for a specific genre.
// It requires as a parameter the reponse object that is returned from the function getMoviesDataByGenreId.
// It returns an object = {movies, total}
// If it doesn't find movies, it return {movies: [], total: 0}

const parseMoviesResponse = (data) => {
    try {
        const {groups, total} = data.response;
        return {movies: groups, total}

    } catch (err) {
        console.log(err);
        return {movies: [], total: 0}
    }
}

export default parseMoviesResponse;