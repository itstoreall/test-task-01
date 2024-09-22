import useData from '../../hooks/useData';
import useUserFilter from '../../hooks/useUserFilter';
import AccountSettings from '../AccountSettings';
import FilterHeading from '../FilterHeading';
import UserList from '../UserList';
import Modal from '../Modal';
import s from './Pages.module.scss';

const config = {
  title: 'Users',
  departmentsLimit: 3,
  modalTitle: 'add user'
};

const { title, departmentsLimit } = config;

const Users = () => {
  const data = useData();

  const {
    filteredUsers,
    pickedDepartments,
    pickedCountry,
    pickedStatus,
    filterDepartments,
    filterCountry,
    filterStatus,
    resetSecondaryFilters
  } = useUserFilter(data.users, departmentsLimit);

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

        <Modal>
          <AccountSettings />
        </Modal>
      </section>
    </main>
  );
};

export default Users;
