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
  Card
} from '@tremor/react';

import { DeleteIcon, EditIcon } from './Icons';
import { useAppSelector} from '../hooks/store';
import { useUsersActions } from '../hooks/useUsersActions';
  
  export function LisOfUsers() {
    const users = useAppSelector((state) => state.users);
    const { removeUser, updateUser, handleFormState } = useUsersActions();

    return (
      <>
        <div  className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
          <button
            type="button"
            className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
            onClick={() => handleFormState()}
          >
            Agregar Usuario
          </button>
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
                    onClick={() => updateUser({id: item.id, name: item.name, email: item.email, github: item.github})}>
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
  </>
  );
}