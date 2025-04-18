// 'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
  Badge,
  Card,
  Button
} from '@tremor/react';

import { DeleteIcon, EditIcon } from './Icons';
import { useAppSelector} from '../hooks/store';
import { useUsersActions } from '../hooks/useUsersActions';
import { CreateNewUser } from './CreateNewUser';
import { useFormContext } from '../context/formContext';
import { useState } from 'react';
import { UserWithId } from '../store/users/slice';
  
  export function LisOfUsers() {
    const users = useAppSelector((state) => state.users);
    const { removeUser} = useUsersActions();
    const {formState, setFormState} = useFormContext()
    const [userToEdit, setUserToEdit] = useState<UserWithId | null>(null)

    return (
      <>
        <div  className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
          <Button
            type="button"
            disabled={formState}
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => setFormState(!formState)}
          >
            Agregar Usuario
          </Button>
        </div>
        <Card className="mt-6 w-full max-w-4xl">
        <Title style={{alignItems:'left'}}>
          Usuarios
          <Badge  className="hidden sm:inline-flex" style={{marginLeft:'12px'}}>{users.length}</Badge>
        </Title>
        <Table className="mt-8">
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                ID
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Name
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Email
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Github
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {item.id}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.github}</TableCell>
                <TableCell>
                  <button type='button' 
                    style={{marginRight:'20px'}}
                    onClick={() => {setUserToEdit(item); setFormState(true);}}>
                    <EditIcon/>
                  </button>
                  <button type='button'
                    onClick={() => removeUser(item.id)}>
                    <DeleteIcon/>
                  </button>
                </TableCell>  
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Card>
    {formState && <CreateNewUser userToEdit={userToEdit} />}
  </>
  );
}