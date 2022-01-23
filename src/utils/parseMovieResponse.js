// Function that returns the info from the movie data to render.
// It requires as a parameter the reponse object that is returned from the function getMovieById.
// It returns an object with {roles, genres, media, ranking, ...and other data}

const parseMovieResponse = (data) => {
    let roles, genres, media;
    const common = data.response?.group?.common;
    const { extendedcommon, ranking, ...rest } = common;
    roles = extendedcommon?.roles?.role;
    genres = extendedcommon?.genres?.genre;
    media = extendedcommon?.media;
    return {roles, genres, media, ranking, ...rest}
}

export default parseMovieResponse;