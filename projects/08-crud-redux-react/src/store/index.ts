import { configureStore, type Middleware } from '@reduxjs/toolkit';
import usersReducer, { rollbackUser } from './users/slice';
import { toast } from 'sonner';

const presistanceLocalStorageMiddleware:Middleware = (store:any) => (next:any) => (action:any) => {
    next(action)
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
};

const syncWithDatabaseMiddleware:Middleware = (store:any) => (next:any) => (action:any) => {
    const {type, payload} = action
    const previousState = store.getState()
    
    next(action)
    console.log(action)
    if (type === 'users/deleteUserById') {
        const userIdToRemove = payload
        const userToRemove = previousState.users.find((user:any) => user.id === userIdToRemove)
        
        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                toast.success(`usuario ${payload} eliminado`)
            }
        })
        .catch(error => {
            toast.error(`Error al eliminar el usuario ${userIdToRemove}`)
            // If the user was not removed from the database, rollback the state to the previous state
            if (userToRemove) store.dispatch(rollbackUser(userToRemove))
            // Rollback the state to the previous state
            console.log(error)
        })
    }
}

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(presistanceLocalStorageMiddleware, syncWithDatabaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;