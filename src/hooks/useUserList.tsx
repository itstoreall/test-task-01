/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useDropdownState from './useDropdownState';
import useData from './useData';
import * as gt from '../types/global';

type DropdownState = gt.DataItemType | null;
type UserValue = string | DropdownState;

const config = {
  error: {
    empty: 'All fields must be filled out!',
    unique: 'The User must be unique!',
    delete: 'The user has not been deleted!'
  }
};

const useUserList = () => {
  const [userName, setUserName] = useState('');
  const [department, setDepartment] = useState<DropdownState>(null);
  const [country, setCountry] = useState<DropdownState>(null);
  const [status, setStatus] = useState<DropdownState>(null);
  const [error, setError] = useState('');

  const { openDropdown, handleToggle, handleClose } = useDropdownState();
  const data = useData();

  useEffect(() => {
    error && setError('');
  }, [userName, department, country, status]);

  // ---

  const handleName = (e: gt.InputChangeEvent) => {
    setUserName(e.target.value);
  };

  const handleDepartment = (val: DropdownState) => setDepartment(val);
  const handleCountry = (val: DropdownState) => setCountry(val);
  const handleStatus = (val: DropdownState) => setStatus(val);

  const addUser = () => {
    const newUser = { name: userName, status, department, country };
    const isFilled = (val: UserValue) => val !== null && val !== '';
    const isAllFields = Object.values(newUser).every(val => isFilled(val));
    const isNameUnique = !data.users.some(user => user.name === userName);

    if (!isAllFields) {
      setError(config.error.empty);
      return false;
    }

    if (!isNameUnique) {
      setError(config.error.unique);
      return false;
    }

    data.createUser(newUser as gt.UserDataItem);
    return true;
  };

  const deleteUser = (userName: string) => {
    const isDeleted = data.deleteUser(userName);
    !isDeleted && console.error(config.error.delete);
  };

  return {
    userName,
    department,
    country,
    status,
    openDropdown,
    error,
    handleName,
    handleDepartment,
    handleCountry,
    handleStatus,
    handleToggle,
    handleClose,
    addUser,
    deleteUser
  };
};

export default useUserList;
