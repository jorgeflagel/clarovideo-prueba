import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// SERVICES
import getDataFromCMS from '../services/getDataFromCMS';
import getMoviesDataByGenreId from '../services/getMoviesDataByGenreId';

// UTILS
import getGenreIdFromUrl from '../utils/getGenreIdFromUrl';
import parseDataFromCMS from '../utils/parseDataFromCMS';
import parseMoviesResponse from '../utils/parseMoviesResponse';
import parseOrderOptions from '../utils/parseOrderOptions';


function MoviesList() {
    let {genre} = useParams();
    const [orderOptions, setOrderOptions] = useState(null)
    const [movies, setMovies] = useState(null);


    useEffect(() => {
        (async function(){
            try {
                const data = await getDataFromCMS(genre);
                const {url, ordenamiento} = parseDataFromCMS(data);
                const genreId = getGenreIdFromUrl(url);
                const parsedOrderOptions = parseOrderOptions(ordenamiento);
                setOrderOptions(parsedOrderOptions);
                const moviesResponse = await getMoviesDataByGenreId(genreId);
                const movies = parseMoviesResponse(moviesResponse);
                setMovies(movies);
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
            <h2>MOVIES</h2>
            <p>{movies && JSON.stringify(movies)}</p>
        </div>
    )
}

export default MoviesList;