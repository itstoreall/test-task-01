import { useEffect, useState } from 'react';
import useDropdownState from './useDropdownState';
import useData from './useData';
import * as gt from '../types/global';

type SelectedUser = gt.UserDataItem | null;

type Key = keyof gt.UserDataItem;

type HandleDropdownChange = (
  field: keyof gt.UserDataItem,
  value: gt.DataItemType
) => void;

const config = {
  department: 'department',
  country: 'country',
  status: 'status'
};

const useEditUser = () => {
  const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);
  const [isDataChanges, setIsDataChanges] = useState(false);

  const { openDropdown, handleToggle, handleClose } = useDropdownState();
  const data = useData();

  useEffect(() => {
    const initUsers = data.users?.find(
      user => user.name === selectedUser?.name
    );
    const isChanged = isUserDataChange(initUsers!, selectedUser!);
    if (isChanged && !isDataChanges) {
      setIsDataChanges(true);
    } else if (!isChanged && isDataChanges) {
      setIsDataChanges(false);
    }
  }, [selectedUser, data.users, isDataChanges]);

  type IsUserDataChange = (
    init: gt.UserDataItem,
    selected: gt.UserDataItem
  ) => boolean;

  const isUserDataChange: IsUserDataChange = (init, selected) => {
    let isChanged = false;
    for (const key in init) {
      if (init.hasOwnProperty(key) && selected.hasOwnProperty(key)) {
        const initValue = (init[key as Key] as gt.DataItem).value;
        const selectedValue = (selected[key as Key] as gt.DataItem).value;
        if (initValue !== selectedValue) isChanged = true;
      }
    }
    return isChanged;
  };

  const handleUserSelect = (user: gt.UserDataItem) => {
    setSelectedUser(user);
    setIsDataChanges(false);
    handleClose();
  };

  const undoChanges = () => {
    if (!selectedUser || !data.users || !isDataChanges) return;
    const initUsers = data.users.find(user => user.name === selectedUser.name);
    if (initUsers) {
      setSelectedUser(initUsers);
      setIsDataChanges(false);
    }
  };

  const saveChanges = () => {
    if (!isDataChanges || !data.users || !selectedUser) return;
    const updatedUsers = data.users.map(user =>
      user.name === selectedUser.name ? selectedUser : user
    );
    setIsDataChanges(false);
    data.updateUsers(updatedUsers);
  };

  const setDepartment = (item: gt.DataItemType) =>
    handleDropdownChange(config.department as keyof gt.UserDataItem, item);

  const setCountry = (item: gt.DataItemType) =>
    handleDropdownChange(config.country as keyof gt.UserDataItem, item);

  const setStatus = (item: gt.DataItemType) =>
    handleDropdownChange(config.status as keyof gt.UserDataItem, item);

  const handleDropdownChange: HandleDropdownChange = (field, value) =>
    selectedUser && setSelectedUser({ ...selectedUser, [field]: value });

  return {
    data,
    selectedUser,
    isDataChanges,
    openDropdown,
    handleToggle,
    handleClose,
    handleUserSelect,
    undoChanges,
    saveChanges,
    setDepartment,
    setCountry,
    setStatus
  };
};

export default useEditUser;
