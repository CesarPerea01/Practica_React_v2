import { createContext, useState } from "react"

//1. Crear el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const FiltersContext = createContext()

//2. Crear el provider, para proveer el contexto
export function FiltersProviders({children}){
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0
    })
    return(
        <FiltersContext.Provider value = {{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}