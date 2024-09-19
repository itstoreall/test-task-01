import { useState, useEffect } from 'react';
import * as gt from '../types/global';

const useUserFilter = (users: gt.UserDataItem[], departmentsLimit: number) => {
  const [filteredUsers, setFilteredUsers] = useState<gt.UserDataItem[]>(users);
  const [departments, setDepartments] = useState<string[]>([]);
  const [country, setCountry] = useState<gt.DataItem | null>(null);
  const [status, setStatus] = useState<gt.DataItem | null>(null);

  const handleFilteredUsers = (users: gt.UserDataItem[]) =>
    setFilteredUsers(users);

  useEffect(() => {
    if (departments.length >= departmentsLimit) return;
    setCountry(null);
    setStatus(null);
  }, [departments, departmentsLimit]);

  // --- Checks:

  const isDepartment = (selected: string[], user: gt.UserDataItem) =>
    selected?.includes(user.department.name);

  const isCountry = (selected: gt.DataItem, user: gt.UserDataItem) =>
    selected?.name === user.country.name;

  const isStatus = (selected: gt.DataItem, user: gt.UserDataItem) =>
    selected?.name === user.status.name;

  // ------ Departments:

  const filterDepartments = (selected: string[]) => {
    if (selected.length > 0) {
      const filtered = users.filter(user => {
        let res = null;

        if (isDepartment(selected, user)) res = user;
        if (res && selected.length >= departmentsLimit) {
          if (country && !isCountry(country, res)) res = null;
          if (res && status && !isStatus(status, res)) res = null;
        }
        return res;
      });
      setFilteredUsers(filtered || []);
    } else setFilteredUsers(users || []);
    setDepartments(selected);
  };

  // ------ Country:

  const filterCountry = (selected: gt.DataItem) => {
    const filtered = users.filter(user => {
      let res;

      const isCountryFiltering =
        isCountry(selected, user) && isDepartment(departments, user);

      if (isCountryFiltering) res = user;
      if (res && status && !isStatus(status, res)) res = null;
      return res;
    });
    setFilteredUsers(filtered);
    setCountry(selected);
  };

  // ------ Status:

  const filterStatus = (selected: gt.DataItem) => {
    const filtered = users.filter(user => {
      let res;

      const isStatusFiltering =
        isStatus(selected, user) && isDepartment(departments, user);

      if (isStatusFiltering) res = user;
      if (res && country && !isCountry(country, res)) res = null;
      return res;
    });
    setFilteredUsers(filtered);
    setStatus(selected);
  };

  // ------ Reset:

  const resetSecondaryFilters = () => {
    /*
    if (departments.length < departmentsLimit) return;
    const init = users.filter(user => isDepartment(departments, user));
    */
    setFilteredUsers(users);
    setDepartments([]);
    setCountry(null);
    setStatus(null);
  };

  return {
    filteredUsers,
    pickedDepartments: departments,
    pickedCountry: country,
    pickedStatus: status,
    handleFilteredUsers,
    filterDepartments,
    filterCountry,
    filterStatus,
    resetSecondaryFilters
  };
};

export default useUserFilter;
