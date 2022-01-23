import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CategoriesMenu from "../components/CategoriesMenu";
import { fetchMovieListByGenre, useMovieList } from "../redux/movieListSlice";

function MovieList() {
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

    return(
        <>
            <CategoriesMenu />
            {movies && movies.length !== 0 &&
                <div>
                    <h1>MOVIES LIST FROM: {genre}</h1>
                    <h2>ORDER OPTIONS</h2>
                    <ul>{ordenamiento?.map(option => <li key={option.label}>{`${option.label}: ${option.order_id} - ${option.order_way}`}</li>)}
                    </ul>
                    <h2>MOVIE LIST</h2>
                    {movies && movies.map(movie => 
                        <img onClick={() => handleClick(movie.id)} key={movie.id} src={movie.image_large} srcSet={`${movie.image_small}, ${movie.image_medium} 400w, ${movie.image_large} 800w`} alt={movie.title}/>
                    )}
                </div>
            }
            {status === 'loading' && 'LOADING...'}
        </>
    )
}

export default MovieList;