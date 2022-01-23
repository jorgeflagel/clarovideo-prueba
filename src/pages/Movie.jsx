import { getRoles } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// UTILS

// SERVICES
import getMovieById from '../services/getMovieById'
import parseMovieResponse from "../utils/parseMovieResponse";

function Movie() {
    let {movieId, genre} = useParams();
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        (async function(){
            try {
                const data = await getMovieById(movieId);
                const parsedMovie = parseMovieResponse(data)
                setMovie(parsedMovie);
            } catch (err) {
                console.error(err);
            }
        })()
    }, [movieId])

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
            <ul>{movie.genres.map(genre => <li>{genre.desc}</li>)}</ul>
            {movie.roles.map(role => (
                <>
                    <h4>{role.desc}</h4>
                    <ul>
                    {role.talents.talent.map(talent => <li>{talent.fullname}</li>)}
                    </ul>
                </>)
            )}
            <h3>ORIGINAL TITLE</h3>
            <p>{movie.media.originaltitle}</p>
        </div>
    )
}

export default Movie;