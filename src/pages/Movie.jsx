import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieById, useMovie } from "../redux/movieSlice";
import CustomButton from "../components/CustomButton";
import styles from "./Movie.module.css";
import Loading from "../components/Loading";

function Movie() {
    const navigate = useNavigate();
    const { movie, status } = useMovie();
    let {movieId, genre} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovieById(movieId))
    }, [movieId, dispatch])

    if(!movie) return null;

    if(status === 'loading') {
        return (
            <>
                <div className={styles.buttonContainer}>
                    <CustomButton onClick={() => navigate(`/mexico/${genre}`)}>Go Back</CustomButton>
                </div>
                <div className={styles.loadingContainer}><Loading /></div>
            </>
        )
    }

    return(
        <div className={styles.mainContainer}>
            <div className={styles.buttonContainer}>
                <CustomButton onClick={() => navigate(`/mexico/${genre}`)}>Go Back</CustomButton>
            </div>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={movie.image_small} 
                        srcSet={`${movie.image_small}, ${movie.image_medium} 400w, ${movie.image_large} 800w`}                    
                        alt={movie.title}
                        className={styles.image}    
                        />
                </div>
                <div className={styles.details}>
                    <h4>{movie.title}</h4>
                    <p>({movie.media.publishyear}) {movie.duration} {movie.media.rating.code}</p>
                    <p>{movie.large_description}</p>
                    <h4>GENEROS</h4>
                    <ul className={styles.genreList}>{movie.genres.map(genre => <li key={genre.id}>{genre.desc}</li>)}</ul>
                    {movie.roles.map(role => (
                        <div key={role.id}>
                            <h4>{role.desc}</h4>
                            <ul className={styles.roleList}>
                            {role.talents.talent.map(talent => <li key={talent.id} className={styles.roleItem}>{talent.fullname}</li>)}
                            </ul>
                        </div>)
                    )}
                    <h3>ORIGINAL TITLE</h3>
                    <p>{movie.media.originaltitle}</p>
                </div>
            </div>
        </div>
    )
}

export default Movie;