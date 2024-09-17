import BinIcon from '../../assets/icon/BinIcon';
import * as gt from '../../types/global';
import s from './UserList.module.scss';

const config = {
  header: {
    cell01: 'Full Name',
    cell02: 'Department',
    cell03: 'Country',
    cell04: 'Status'
  }
};

const { cell01, cell02, cell03, cell04 } = config.header;

const UserList = ({ users }: { users: gt.UserDataItem[] }) => {
  return (
    <div className={s.table}>
      <ul className={s.headerList}>
        <li className={s.headerItem}>
          <span className={s.value}>{cell01}</span>
        </li>
        <li className={s.headerItem}>
          <span className={s.value}>{cell02}</span>
        </li>
        <li className={s.headerItem}>
          <span className={s.value}>{cell03}</span>
        </li>
        <li className={s.headerItem}>
          <span className={s.value}>{cell04}</span>
        </li>
        <li className={s.headerItem} />
      </ul>

      <ul className={s.userList}>
        {users.map(user => (
          <li key={user.name} className={s.userItem}>
            <ul className={s.userDataList}>
              <li className={s.userDataItem}>
                <span className={s.value}>{user.name}</span>
              </li>
              <li className={s.userDataItem}>
                <span className={s.value}>{user.department.name}</span>
              </li>
              <li className={s.userDataItem}>
                <span className={s.value}>{user.country.name}</span>
              </li>
              <li className={s.userDataItem}>
                <span className={s.value}>{user.status.name}</span>
              </li>
              <li className={s.userDataItem}>
                <span className={s.value}>
                  <BinIcon />
                </span>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
