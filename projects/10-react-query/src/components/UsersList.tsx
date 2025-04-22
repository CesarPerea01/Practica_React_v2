import { SortBy, type User } from '../types.d'

interface Props {
    changeSorting: (sort: SortBy) => void
    deleteUser: (idToDelete: string) => void
    showColors: boolean
    users: User[]
}

export function UsersList({ changeSorting, deleteUser, showColors, users }: Props) {
    return (
        <table style={{ width: '100%', paddingTop: '20px' }}>
            <thead>
                <tr>
                    <th>Fotos</th>
                    <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }} >Nombre</th>
                    <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
                    <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((user, index) => {
                        const backgroundColor = index % 2 === 0 ? { backgroundColor: '#333' } : { backgroundColor: '#555' }
                        const bg = showColors ? backgroundColor : {}
                        return (
                            <tr key={user.login.uuid} style={{ ...bg }}>
                                <td>
                                    <img src={user.picture.thumbnail} />
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button onClick={() => deleteUser(user.login.uuid)}>Borrar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table >
    )
}