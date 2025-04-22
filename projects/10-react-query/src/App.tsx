import { useMemo, useState } from "react"
import { UsersList } from "./components/UsersList.tsx"
import "./App.css";
import { type User, SortBy } from './types.d';
import { useUsers } from "./hooks/useUsers.ts";


function App() {
  const {
    isLoading,
    isError,
    users,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)

  // Toggle colors for rows
  const toggleColors = () => {
    setShowColors(!showColors)
  }

  // Toggle sorting by country
  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }


  /// Deletes user by uuid
  const deleteUser = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid
    )
    refetch()
  }

  // Restores the original state
  const handleRestore = () => {
    refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  // Filter users by country
  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      }))
      : users
  }, [users, filterCountry])

  // Sort users by country
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Prueba Tecnica</h1>
      <header style={{ display: 'inline-flex', gap: '10px', padding: '20px' }}>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais'}
        </button>
        <button onClick={handleRestore}>Restaurar estado inicial</button>
        <input type="text" placeholder="Filtrar por pais"
          style={{ fontSize: '16px' }}
          onChange={(e) => { setFilterCountry(e.target.value) }} />
      </header>
      <main>
        {users.length > 0 && <UsersList changeSorting={handleChangeSort} deleteUser={deleteUser} showColors={showColors} users={sortedUsers} />}

        {isLoading && <p>...Cargando</p>}
        {isError && <strong>Ha habido un error</strong>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError &&
          <button onClick={() => { void fetchNextPage() }} disabled={isFetchingNextPage || hasNextPage === false}>
            {isFetchingNextPage ? "Cargando mas resultados..." : hasNextPage ? "Cargar mas resultados" : "No hay mas usuarios"}
          </button>}
      </main>
    </div>
  );
}

export default App;
