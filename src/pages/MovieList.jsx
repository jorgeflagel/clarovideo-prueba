import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// SERVICES
import getDataFromCMS from '../services/getDataFromCMS';
import getMovieListByGenreId from '../services/getMovieListByGenreId';

// UTILS
import getGenreIdFromUrl from '../utils/getGenreIdFromUrl';
import parseDataFromCMS from '../utils/parseDataFromCMS';
import parseMovieListResponse from '../utils/parseMovieListResponse';
import parseOrderOptions from '../utils/parseOrderOptions';


function MovieList() {
    let {genre} = useParams();
    const [orderOptions, setOrderOptions] = useState(null)
    const [movieList, setMovieList] = useState(null);


    useEffect(() => {
        (async function(){
            try {
                const data = await getDataFromCMS(genre);
                const {url, ordenamiento} = parseDataFromCMS(data);
                const genreId = getGenreIdFromUrl(url);
                const parsedOrderOptions = parseOrderOptions(ordenamiento);
                setOrderOptions(parsedOrderOptions);
                const movieListResponse = await getMovieListByGenreId(genreId);
                const movieList = parseMovieListResponse(movieListResponse);
                setMovieList(movieList);
            } catch(err) {
                console.error(err)
            }
        })()        
    }, [genre])

    return(
        <div>
            <Link to='/mexico'>Go Back</Link>
            <h1>MOVIES LIST FROM: {genre}</h1>
            <h2>ORDER OPTIONS</h2>
            <p>{orderOptions && JSON.stringify(orderOptions)}</p>
            <h2>MOVIE LIST</h2>
            <p>{movieList && JSON.stringify(movieList)}</p>
        </div>
    )
}

export default MovieList;