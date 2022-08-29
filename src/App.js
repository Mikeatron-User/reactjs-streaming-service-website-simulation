
import './App.css';
import SearchIcon from './search.svg';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard'


function App() {

  //UseState for displaying movies
  const[movies, setMovies] = useState([]);

  const[searchTerm, setSearchTerm] = useState('');

  //The API where we get all our movie data from
  const API_URL = 'http://www.omdbapi.com/?apikey=43730a3f';

  //Retrieves movies from API based on search
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    //Get Movie data from API and set it
    setMovies(data.Search);
  }

  //Searches for movies once per reload
  useEffect(() => {
    searchMovies('Blade')
  }, []);


  //Start of Actual Display Stuff
  return (
    <div className="App">
      <h1> Streaming Service Simulator</h1>

      <div className="search"> 
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <img 
        src={SearchIcon}
        alt="search"
        onClick={() => searchMovies(searchTerm)} //Listener
        />
      </div>

      {movies?.length > 0 //If movies array is > 0, then display them        
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </div>
        ) : ( //Otherwise, just tell the user there are none
          <div className="empty">
            <h2> No Movies Found</h2>
          </div>
        )
      }

      
    </div>
  );
}

export default App;
