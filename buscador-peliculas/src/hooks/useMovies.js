import responseApi from '../mocks/viewApi.json'
import withOutResults from '../mocks/withOutResults.json'

export function useMovie () {
    const movies = responseApi.Search;
  
    const templateMovies = movies?.map(movie => ({ 
     id: movie.imdbID,
     title: movie.Title,
     year: movie.Year,
     poster: movie.Poster
    }))
  
    return {movies: templateMovies}
  }