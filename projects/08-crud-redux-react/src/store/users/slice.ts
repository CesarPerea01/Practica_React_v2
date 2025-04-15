import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type UserId = string | number

const DEFAULT_STATE = [
    {
      id: "1",
      name: "Pedro Sanchez",
      email: "perrosanchez@hotmail.com",
      github: "Sanchez el Perro",
    },
    {
      id: "2",
      name: "Francisco Franco",
      email: "vivavox@hotmail.com",
      github: "Paco Franco",
    },
    {
      id: "3",
      name: "Rui Lopez",
      email: "rlopez@gmail.com",
      github: "Rui Lopez",
    },
    {
      id: "4",
      name: "Hans Landa",
      email: "thehunter@gmail.com",
      github: "Landa Hans",
    },
    {
      id: "5",
      name: "Derek Vinyard",
      email: "theneofollower@gmail.com",
      github: "Derek Vinyard",
    },
    {
      id: "6",
      name: "Cristiano Ronaldo",
      email: "elbicho.cr7@gmail.com",
      github: "Cris Ronaldo",
    },
]


export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id: UserId;
}

const initialState: UserWithId[] = (()=>{
    const persistedState = localStorage.getItem("__redux__state__")
    if (persistedState) {
        return JSON.parse(persistedState).users
    }
    return DEFAULT_STATE
})()


export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = state.length + 1
            const newUser = action.payload
            const userWithId = { id, ...newUser}
            state.push(userWithId)
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter((user) => user.id !== id)
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.some((user) => user.id === action.payload.id)
            if (!isUserAlreadyDefined) {
                state.push(action.payload)
            }
        },
        updateUserById: (state, action: PayloadAction<UserWithId>) => {
            const userToUpdate = action.payload
            const userIndex = state.findIndex((user) => user.id === userToUpdate.id)
            if (userIndex !== -1) {
                state[userIndex] = userToUpdate
            }
        }
    },
})

export default usersSlice.reducer

export const { deleteUserById, addNewUser, rollbackUser, updateUserById } = usersSlice.actions