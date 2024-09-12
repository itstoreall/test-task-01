import s from './UserList.module.scss';

const UserList = () => {
  return (
    <div className={s.usersBlock}>
      <ul className={s.userList}>
        <li>user</li>
        <li>user</li>
        <li>user</li>
      </ul>
    </div>
  );
};

export default UserList;
