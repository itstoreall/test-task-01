import { createContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';
import departments from '../data/departments.json';
import countries from '../data/countries.json';
import statuses from '../data/statuses.json';
import * as gt from '../types/global';

const initContext: gt.DataContext = {
  users: [],
  departments: [],
  countries: [],
  statuses: [],
  createUser: () => {},
  updateUsers: () => {},
  deleteUser: () => false
};

export const DataContext = createContext(initContext);

export const DataProvider = ({ children }: gt.ChildrenProps) => {
  const [users, setUsers] = useState<gt.UserDataItem[]>([]);

  useEffect(() => setUsers(usersData), []);

  // ---

  const createUser = (newUser: gt.UserDataItem) =>
    setUsers(prev => [newUser, ...prev]);

  const updateUsers = (updatedUsers: gt.UserDataItem[]) =>
    setUsers(updatedUsers);

  const deleteUser = (userName: string) => {
    const isExists = users.some(user => user.name === userName);
    if (!isExists) return false;
    const updatedUsers = users.filter(user => user.name !== userName);
    setUsers(updatedUsers);
    return true;
  };

  const contextValue = {
    users,
    departments,
    countries,
    statuses,
    createUser,
    updateUsers,
    deleteUser
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
