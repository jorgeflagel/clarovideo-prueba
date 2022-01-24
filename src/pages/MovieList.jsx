import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CategoriesMenu from "../components/CategoriesMenu";
import Loading from "../components/Loading";
import { fetchMovieListByGenre, useMovieList } from "../redux/movieListSlice";
import styles from './MovieList.module.css';


function MovieList() {
    const [search, setSearch] = useState('');
    let { genre } = useParams();
    const movieList = useMovieList();
    const { ordenamiento, movies, status, genre: previousGenre } = movieList;
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClick = movieId => navigate(`/mexico/${genre}/${movieId}`);

    useEffect(() => {
        if(previousGenre !== genre) {
            dispatch(fetchMovieListByGenre(genre));
        }
        const infiniteScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight){
                dispatch(fetchMovieListByGenre(genre));
            }
        }
        window.addEventListener('scroll', infiniteScroll);
        return () => window.removeEventListener('scroll', infiniteScroll)
    }, [genre, dispatch, previousGenre])  
    
    let filteredMovies;
    if (search) {
        filteredMovies = movies?.filter(movie => movie?.title?.toLowerCase()?.includes(search.toLowerCase()))
    } else {
        filteredMovies = movies;
    }

    return(
        <>
            <CategoriesMenu search={search} setSearch={setSearch}/>
            {filteredMovies && filteredMovies.length !== 0 &&
                <div>
                    {/* <h2>ORDER OPTIONS</h2>
                    <ul>{ordenamiento?.map(option => 
                        <li key={option.label}>{`${option.label}: ${option.order_id} - ${option.order_way}`}</li>)}
                    </ul> */}
                    {filteredMovies && filteredMovies.map(movie => 
                        <img className={styles.image} onClick={() => handleClick(movie.id)} 
                            key={movie.id} 
                            src={movie.image_large} 
                            srcSet={`${movie.image_small}, ${movie.image_medium} 400w, ${movie.image_large} 800w`} 
                            alt={movie.title}/>
                    )}
                </div>
            }
            <div className={styles.loadingContainer}>
            {status === 'loading' && <Loading />}
            </div>
        </>
    )
}

export default MovieList;