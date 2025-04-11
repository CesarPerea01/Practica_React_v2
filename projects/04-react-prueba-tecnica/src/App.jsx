import './App.css'
import { useCatImage } from './hooks/useCastImage'
import { useCatFact } from './hooks/useCatFact'

function App() {
  const {fact, refreshFact} = useCatFact()
  const {image} = useCatImage({fact})

const handleClick = async()=>{
  refreshFact()
}

  return (
  <main>
    <h1>App de gatitos</h1>
    <button onClick={handleClick}>Get new fact</button>
    {fact && <p>{fact}</p>}
    {image && <img src = {image} alr='GATO'/>}
  </main>
  
  )
}
export default App
