import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// STYLES
import './App.css';

// PAGES
import CategoriesMenu from './pages/CategoriesMenu';
import Movie from './pages/Movie';
import MoviesList from './pages/MoviesList';
import NotFound from './pages/NotFound';
import Welcome from './pages/Welcome';


function App() {

  return (
    <div className="App">
      <h1>CLARO VIDEO APP</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/mexico" element={<CategoriesMenu />} >
            <Route index element={<Welcome />} />
            <Route path=":genre/:movieId" element={<Movie />} />
            <Route exact path=":genre" element={<MoviesList />}/>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
