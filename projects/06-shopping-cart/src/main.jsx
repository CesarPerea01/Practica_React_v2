import { createRoot } from 'react-dom/client'
import { FiltersProviders } from './context/filters.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <FiltersProviders>
    <App />
  </FiltersProviders>
)
