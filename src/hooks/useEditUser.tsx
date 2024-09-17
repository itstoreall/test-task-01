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

const useEditUser = () => {
  const [users, setUsers] = useState<gt.UserDataItem[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);
  const [isDataChanges, setIsDataChanges] = useState(false);

  const { openDropdown, handleToggle, handleClose } = useDropdownState();

  const data = useData();

  useEffect(() => {
    setUsers(data.user);
  }, [data.user]);

  useEffect(() => {
    const initUsers = users?.find(user => user.name === selectedUser?.name);
    const isChanged = isUserDataChange(initUsers!, selectedUser!);
    if (isChanged && !isDataChanges) {
      setIsDataChanges(true);
    } else if (!isChanged && isDataChanges) {
      setIsDataChanges(false);
    }
  }, [selectedUser, users, isDataChanges]);

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
    if (!selectedUser || !users || !isDataChanges) return;
    const initUsers = users.find(user => user.name === selectedUser.name);
    if (initUsers) {
      setSelectedUser(initUsers);
      setIsDataChanges(false);
    }
  };

  const saveChanges = () => {
    if (!isDataChanges || !users || !selectedUser) return;
    const updatedUser = users.map(user =>
      user.name === selectedUser.name ? selectedUser : user
    );
    setIsDataChanges(false);
    setUsers(updatedUser);
  };

  const setDepartment = (item: gt.DataItemType) =>
    handleDropdownChange('department', item);

  const setCountry = (item: gt.DataItemType) =>
    handleDropdownChange('country', item);

  const setStatus = (item: gt.DataItemType) =>
    handleDropdownChange('status', item);

  const handleDropdownChange: HandleDropdownChange = (field, value) =>
    selectedUser && setSelectedUser({ ...selectedUser, [field]: value });

  return {
    data,
    users,
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
