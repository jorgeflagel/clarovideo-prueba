import './App.css';
import { useEffect } from 'react';
import getDataFromCMS from './services/getDataFromCMS';
import parseDataFromCMS from './util/parseDataFromCMS';
import getMoviesDataByGenreId from './services/getMoviesDataByGenreId';
import getGenreIdFromUrl from './util/getGenreIdFromUrl';
import parseMoviesResponse from './util/parseMoviesResponse';
import parseOrderOptions from './util/parseOrderOptions';

function App() {

  useEffect(() => {
    (async function() {
      const data = await getDataFromCMS('gen_accion');
      console.log(data);
      const {url, ordenamiento} = parseDataFromCMS(data);
      console.log(url);
      console.log(ordenamiento);
      const genreId = getGenreIdFromUrl(url);
      console.log(genreId);
      const orderOptions = parseOrderOptions(ordenamiento);
      console.log(orderOptions);

      // Test without options
      const moviesResponse = await getMoviesDataByGenreId(genreId);
      const movies = parseMoviesResponse(moviesResponse);
      console.log(movies);

      // Test with options
      const options = {order_way: 'DESC', order_id: 100, quantity: 100, from: 100};
      const moviesWithOptionsResponse = await getMoviesDataByGenreId(genreId, options);
      const moviesWithOptions = parseMoviesResponse(moviesWithOptionsResponse)
      console.log(moviesWithOptions);

    })()
  }, [])



  return (
    <div className="App">
      <h1>CLARO VIDEO APP</h1>
    </div>
  );
}

export default App;
