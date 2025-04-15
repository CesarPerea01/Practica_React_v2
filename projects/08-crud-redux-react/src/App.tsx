import { Toaster } from 'sonner'
import './App.css'
import { CreateNewUser } from './components/CreateNewUser'
import { LisOfUsers } from './components/ListOfUsers'

function App() {

  return (
    <>
      <h1>Nuestro proyecto con Redux</h1>
      <LisOfUsers />
      <CreateNewUser/>
      <Toaster richColors/>
    </>
  )
}

export default App
