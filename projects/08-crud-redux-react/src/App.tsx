import { Toaster } from 'sonner'
import './App.css'
import { LisOfUsers } from './components/ListOfUsers'
import { FormProvider } from './context/formContext'

function App() {

  return (
    <>
      <h1>Nuestro proyecto con Redux</h1>
      <FormProvider>
        <LisOfUsers />
      </FormProvider>
      <Toaster richColors/>
    </>
  )
}

export default App
