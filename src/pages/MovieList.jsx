import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchMovieListByGenre, useMovieList } from "../redux/movieListSlice";

function MovieList() {
    let { genre } = useParams();
    const movieList = useMovieList();
    const { ordenamiento, movies } = movieList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovieListByGenre(genre));
    }, [genre, dispatch])

        if(!movies || movies.length === 0) return null;

    return(
        <div>
            <Link to='/mexico'>Go Back</Link>
            <h1>MOVIES LIST FROM: {genre}</h1>
            <h2>ORDER OPTIONS</h2>
            <ul>{ordenamiento?.map(option => <li key={option.label}>{`${option.label}: ${option.order_id} - ${option.order_way}`}</li>)}
            </ul>
            <h2>MOVIE LIST</h2>
            {movies && movies.map(movie => 
                <img key={movie.id} src={movie.image_large} srcSet={`${movie.image_small}, ${movie.image_medium} 400w, ${movie.image_large} 800w`} alt={movie.title}/>
            )}
        </div>
    )
}

export default MovieList;