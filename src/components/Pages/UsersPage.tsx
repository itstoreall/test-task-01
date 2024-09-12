import FilterHeading from '../FilterHeading';
import UserList from '../UserList';
import s from './Pages.module.scss';

const config = {
  title: 'Users'
};

const { title } = config;

const Users = () => {
  return (
    <main className={s.main}>
      <section className={`${s.content} ${s.users}`}>
        <h2>{title}</h2>

        <div className={s.filterHeadingBlock}>
          <FilterHeading />
        </div>

        <div className={s.userListBlock}>
          <UserList />
        </div>
      </section>
    </main>
  );
};

export default Users;
