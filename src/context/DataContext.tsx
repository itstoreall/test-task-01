import { createContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';
import departments from '../data/departments.json';
import countries from '../data/countries.json';
import statuses from '../data/statuses.json';
import * as gt from '../types/global';

const config = { ls: { key: 'test_task_01_data' } };

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

  useEffect(() => {
    const storedData = localStorage.getItem(config.ls.key);
    if (storedData) return setUsers(JSON.parse(storedData));
    setUsers(usersData);
    saveToLocalStorage(usersData);
  }, []);

  useEffect(() => saveToLocalStorage(users), [users]);

  // ---

  const saveToLocalStorage = (users: gt.UserDataItem[]) =>
    localStorage.setItem(config.ls.key, JSON.stringify(users));

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
