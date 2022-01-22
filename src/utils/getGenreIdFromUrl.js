//  Function that returns the genre_id from the fetched CMS url
//  It requires as a parameter the url that comes from the function parseDataFromCMS
//  It returns a string = genre or null if the query param "node" doesn't exists

const getGenreIdFromUrl = url => {
    const parsedUrl = url.split('?')
    const params = new URLSearchParams(parsedUrl[1]);
    const node = params.get('filter_id');
    return node
}

export default getGenreIdFromUrl;