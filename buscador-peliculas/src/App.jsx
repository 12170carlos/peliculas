import "./App.css";
import { useEffect, useState, useRef } from "react"; //referencia mutable, que persiste en todo el ciclo de vida del componente
import { Movies } from "./Components/movies";

import { useMovies } from "./hooks/useMovies";
import { render } from "react-dom";


function useSearch () {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true)

  const firstInput = () => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
  }

  useEffect(() => {
   
    firstInput()
    
    if (search === ''){
      
      setError('EL campo no debe estar vacío')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con número');
      return
    }

    if (search.length < 3) {
      
      setError('La búsqueda debe tener al menos 3️⃣ caracteres');
      return
    }

    setError(null)

  }, [search])

  return { search, updateSearch, error }
}

function App() {

  const [ sort, setSort ]  = useState(false)
  const { search, updateSearch, error } = useSearch();
  const  { movies: templateMovies, loading, getMovies } = useMovies({ search, sort });
  

  const handleSort = () => {
    setSort(!sort)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
       
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    updateSearch(event.target.value)
    
  }

  

  return (
    <div className="page">
      <header>
        <form className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name="search" placeholder="Avengers, Star Wars, The Matriz..." />
          
          <input type='checkbox' onChange={handleSort} checked={sort}></input>
          <button 
            disabled={error}
            type="submit">Buscar</button>
        </form>
        {error && <p style={ {color: 'red'} } > {error}</p>}
      </header>
    
      <main>
        {
          loading ? <p>Cargando...</p>
          :

        <Movies movies={templateMovies} />
        }
        
      </main>
    </div>
  );
}

export default App;
