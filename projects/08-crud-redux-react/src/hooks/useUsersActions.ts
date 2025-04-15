import {useAppDispatch } from './store';
import { deleteUserById, UserId, addNewUser, User } from '../store/users/slice';

export function useUsersActions() {
  const dispatch = useAppDispatch();

  const addUser = ({name, email, github}:User) =>{
    dispatch(addNewUser({name, email, github}));
  }
  const removeUser = (id: UserId) => {
  dispatch(deleteUserById(id));
  }

  return {
    removeUser,
    addUser
  }
}
