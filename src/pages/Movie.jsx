import { Link, useParams } from "react-router-dom";

function Movie() {
    let {movieId, genre} = useParams();


    return(
        <div>
            <Link to={`/mexico/${genre}`}>Go Back</Link>
            <h1>MOVIE ID: {movieId}</h1>
        </div>
    )
}

export default Movie;