const API_KEY = 'd4100070'

export const searchMovies = async ({ search }) => {
  if (search === '') return null
  try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
      const responseJson = await response.json()
  
      const movies = responseJson.Search
  
    return movies?.map(movie => ({ 
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
    
  } catch (e) {
    throw new Error('Erroe searching movies')
  }
  

}
