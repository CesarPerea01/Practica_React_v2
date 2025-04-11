import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({query, sort}){
    const [movies, setMovies] = useState([])
    const previousQuery = useRef(query)
  
    const getMovies = useCallback (async ({query})=>{
        if (query == previousQuery.current) return

        previousQuery.current = query
        const newMovies = await searchMovies({query})
        setMovies(newMovies)
    },[])


    const sortedMovies = useMemo(()=>{
        return sort
            ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
            : movies
    },[movies, sort])

    return {movies: sortedMovies, getMovies}
  }