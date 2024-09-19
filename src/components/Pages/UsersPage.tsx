/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useData from '../../hooks/useData';
import useUserFilter from '../../hooks/useUserFilter';
import * as gt from '../../types/global';
import FilterHeading from '../FilterHeading';
import UserList from '../UserList';
import s from './Pages.module.scss';

const config = {
  title: 'Users',
  departmentsLimit: 3
};

const { title, departmentsLimit } = config;

const Users = () => {
  const [users, setUsers] = useState<gt.UserDataItem[]>([]);

  const data = useData();

  const {
    filteredUsers,
    pickedDepartments,
    pickedCountry,
    pickedStatus,
    handleFilteredUsers,
    filterDepartments,
    filterCountry,
    filterStatus,
    resetSecondaryFilters
  } = useUserFilter(users, departmentsLimit);

  useEffect(() => {
    if (users.length > 0) return;
    setUsers(data.user);
    handleFilteredUsers(data.user);
  }, [data]);

  return (
    <main className={s.main}>
      <section className={`${s.content} ${s.users}`}>
        <h2>{title}</h2>

        <div className={s.filterHeadingBlock}>
          <FilterHeading
            selectedDepartments={pickedDepartments}
            selectedCountry={pickedCountry}
            selectedStatus={pickedStatus}
            filterDepartments={filterDepartments}
            filterCountry={filterCountry}
            filterStatus={filterStatus}
            resetSecondaryFilters={resetSecondaryFilters}
          />
        </div>

        <div className={s.userListBlock}>
          <UserList users={filteredUsers} />
        </div>
      </section>
    </main>
  );
};

export default Users;
