import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchMovieById, useMovie } from "../redux/movieSlice";

function Movie() {
    const { movie } = useMovie();
    let {movieId, genre} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovieById(movieId))
    }, [movieId, dispatch])

    if(!movie) {
        return null
    }

    return(
        <div>
            <Link to={`/mexico/${genre}`}>Go Back</Link>
            <h1>MOVIE</h1>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <h3>LARGE DESCRIPTION</h3>
            <p>{movie.large_description}</p>
            <h4>INFO</h4>
            <p>({movie.media.publishyear}) {movie.duration} {movie.media.rating.code} </p>
            <h3>RANKING</h3>
            <p>{JSON.stringify(movie.ranking)}</p>
            <h3>GENRES</h3>
            <ul>{movie.genres.map(genre => <li key={genre.id}>{genre.desc}</li>)}</ul>
            {movie.roles.map(role => (
                <div key={role.id}>
                    <h4>{role.desc}</h4>
                    <ul>
                    {role.talents.talent.map(talent => <li key={talent.id}>{talent.fullname}</li>)}
                    </ul>
                </div>)
            )}
            <h3>ORIGINAL TITLE</h3>
            <p>{movie.media.originaltitle}</p>
        </div>
    )
}

export default Movie;