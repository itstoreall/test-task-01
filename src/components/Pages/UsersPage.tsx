import { useEffect, useState } from 'react';
import useData from '../../hooks/useData';
import * as gt from '../../types/global';
import FilterHeading from '../FilterHeading';
import UserList from '../UserList';
import s from './Pages.module.scss';

const config = {
  title: 'Users'
};

const { title } = config;

const Users = () => {
  const [users, setUsers] = useState<gt.UserDataItem[] | null>(null);

  const data = useData();

  useEffect(() => {
    setUsers(data.user);
  }, [data]);

  return (
    <main className={s.main}>
      <section className={`${s.content} ${s.users}`}>
        <h2>{title}</h2>

        <div className={s.filterHeadingBlock}>
          <FilterHeading />
        </div>

        <div className={s.userListBlock}>
          <UserList users={users || []} />
        </div>
      </section>
    </main>
  );
};

export default Users;
