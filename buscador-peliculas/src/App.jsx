import "./App.css";
import { Movies } from "./Components/movies";

import { useMovie } from "./hooks/useMovies";



function App() {


  const  { movies: templateMovies } = useMovie()

  return (
    <div className="page">
      <header>
        <form className="form">
          <input placeholder="Avengers, Star Wars, The Matriz..." />
          <button type="submit">Buscar</button>
        </form>
      </header>
    
      <main>
        <Movies movies={templateMovies} />
        
      </main>
    </div>
  );
}

export default App;
