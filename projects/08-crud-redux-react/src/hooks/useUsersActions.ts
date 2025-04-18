import {useAppDispatch } from './store';
import { deleteUserById, UserId, addNewUser, User, updateUserById } from '../store/users/slice';

export function useUsersActions() {
  const dispatch = useAppDispatch();

  const addUser = ({name, email, github}:User) =>{
    dispatch(addNewUser({name, email, github}));
  }
  const removeUser = (id: UserId) => {
  dispatch(deleteUserById(id));
  }
  const updateUser = ({id, name, email, github}: User & {id: UserId}) => {
    dispatch(updateUserById({id, name, email, github}));
  }


  return {
    removeUser,
    addUser,
    updateUser,
  }
}
