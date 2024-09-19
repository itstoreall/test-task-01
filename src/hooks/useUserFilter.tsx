import { useState, useEffect } from 'react';
import * as gt from '../types/global';

const useUserFilter = (users: gt.UserDataItem[], departmentsLimit: number) => {
  const [filteredUsers, setFilteredUsers] = useState<gt.UserDataItem[]>(users);
  const [pickedDepartments, setPickedDepartments] = useState<string[]>([]);
  const [pickedCountry, setPickedCountry] = useState<gt.DataItem | null>(null);
  const [pickedStatus, setPickedStatus] = useState<gt.DataItem | null>(null);

  const handleFilteredUsers = (users: gt.UserDataItem[]) =>
    setFilteredUsers(users);

  useEffect(() => {
    if (pickedDepartments.length >= departmentsLimit) return;
    setPickedCountry(null);
    setPickedStatus(null);
  }, [pickedDepartments, departmentsLimit]);

  // --- Checks:

  const isDepartment = (selected: string[], user: gt.UserDataItem) =>
    selected.includes(user.department.name);

  const isCountry = (selected: gt.DataItem, user: gt.UserDataItem) =>
    selected.name === user.country.name;

  const isStatus = (selected: gt.DataItem, user: gt.UserDataItem) =>
    selected.name === user.status.name;

  // ------ Departments:

  const filterDepartments = (selected: string[]) => {
    if (selected.length > 0) {
      const filtered = users.filter(user => {
        let res = null;

        if (isDepartment(selected, user)) res = user;
        if (res && selected.length >= departmentsLimit) {
          if (pickedCountry && !isCountry(pickedCountry, res)) res = null;
          if (res && pickedStatus && !isStatus(pickedStatus, res)) res = null;
        }
        return res;
      });
      setFilteredUsers(filtered || []);
    } else setFilteredUsers(users || []);
    setPickedDepartments(selected);
  };

  // ------ Country:

  const filterCountry = (selected: gt.DataItem) => {
    const filtered = users.filter(user => {
      let res;

      const isCountryFiltering =
        isCountry(selected, user) && isDepartment(pickedDepartments, user);

      if (isCountryFiltering) res = user;
      if (res && pickedStatus && !isStatus(pickedStatus, res)) res = null;
      return res;
    });
    setFilteredUsers(filtered);
    setPickedCountry(selected);
  };

  // ------ Status:

  const filterStatus = (selected: gt.DataItem) => {
    const filtered = users.filter(user => {
      let res;

      const isStatusFiltering =
        isStatus(selected, user) && isDepartment(pickedDepartments, user);

      if (isStatusFiltering) res = user;
      if (res && pickedCountry && !isCountry(pickedCountry, res)) res = null;
      return res;
    });
    setFilteredUsers(filtered);
    setPickedStatus(selected);
  };

  return {
    filteredUsers,
    pickedDepartments,
    pickedCountry,
    pickedStatus,
    handleFilteredUsers,
    filterDepartments,
    filterCountry,
    filterStatus
  };
};

export default useUserFilter;
