import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import debounce from 'just-debounce-it'

function useQuery (){
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstRender = useRef(true)

  useEffect(()=>{
    if (isFirstRender.current){
      isFirstRender.current = query == ''
      return
    } 
    if (query == ''){
      setError('Debes ingresar un texto para buscar')
      return
    }

    if(query.length<3){
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)

  }, [query])

  return{query, setQuery, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {query, setQuery, error} = useQuery()
  const {movies, getMovies} = useMovies({query, sort})

  const debouncedGetMovies = useCallback( 
    debounce(query => {
      console.log('search: ', query)
      getMovies({query})
  },700)
  ,[getMovies])
  //const inputRef = useRef()
  
  const handleSubmit =(event)=>{
    event.preventDefault()
    getMovies({query})
  }

  const handleSort = ()=>[
    setSort(!sort)
  ]

  const handleChange=(event)=>{
    const newQuery = event.target.value
    setQuery(newQuery)
    debouncedGetMovies(newQuery)
  }


  return (
    <div className='page'>
      <header>
        <h1>Buscador de peliculas</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input onChange={handleChange} value={query} name='query' type="text" placeholder='The Godfather, The Matrix...' />
        <input type="checkbox" onChange={handleSort} checked={sort}/>
        <button type='submit'>Buscar</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p> }
      </header>

      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
