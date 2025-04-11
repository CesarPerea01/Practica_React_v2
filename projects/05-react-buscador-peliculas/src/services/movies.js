

export const searchMovies=async({query}) => {
    if(query =='')return null

    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=4a3b711b&s=${query}`)
        const json = await response.json()

        const movies = json.Search
  
        return movies?.map(movie =>({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }))
    } catch (e){
        console.log(e)
        throw new Error ('Error searching movies')
    }
}