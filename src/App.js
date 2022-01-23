import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// STYLES
import './App.css';

// PAGES
import Movie from './pages/Movie';
import MovieList from './pages/MovieList';
import NotFound from './pages/NotFound';
import Welcome from './pages/Welcome';

// STORE
import { store } from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <h1>CLARO VIDEO APP</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/mexico" >
              <Route index element={<Welcome />} />
              <Route path=":genre/:movieId" element={<Movie />} />
              <Route exact path=":genre" element={<MovieList />}/>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
