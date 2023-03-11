import withResults from '../mocks/viewApi.json'
import { useState } from 'react';
import withOutResults from '../mocks/withOutResults.json'

export function useMovies ( { search }) {

  const [ responseMovies, setResponseMovies ] = useState([])

  const movies = responseMovies.Search

  const templateMovies = movies?.map(movie => ({ 
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  const getMovies  = () => {
    if (search) {
      fetch(`http://www.omdbapi.com/?apikey=d4100070&s=${search}`)
        .then(res => res.json())
        .then(json => {
          setResponseMovies(json)
        })
        .catch(error => console.error(error));
    }else {
      setResponseMovies(withOutResults)
    }
  
  }

  return {movies: templateMovies, getMovies}
  }