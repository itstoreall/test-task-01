import useDropdownState from '../../hooks/useDropdownState';
import Input from '../Input';
import Dropdown from '../Dropdown';
import s from './Pages.module.scss';
import useData from '../../hooks/useData';

const config = {
  title: 'Edit User',
  subtitle: 'User Information',
  input: { user: 'user', name: 'full name' },
  dropdown: {
    department: 'department',
    country: 'country',
    status: 'status'
  }
};

const { title, subtitle } = config;
const { user, name } = config.input;
const { department, country, status } = config.dropdown;

const EditUser = () => {
  const { openDropdown, handleToggle, handleClose } = useDropdownState();

  const data = useData();

  return (
    <main className={s.main}>
      <section className={`${s.content} ${s.editUser}`}>
        <h2>{title}</h2>

        <div className={s.ownerBlock}>
          <Dropdown
            header={user}
            data={data.user}
            isOpen={openDropdown === user}
            onToggle={() => handleToggle(user)}
            onClose={handleClose}
          />
        </div>

        <div className={s.companyInfoBlock}>
          <h3 className={s.subtitle}>{subtitle}</h3>

          <div className={s.frame}>
            <Input header={name} readOnly />
            <Dropdown
              header={department}
              data={data.department}
              isOpen={openDropdown === department}
              onToggle={() => handleToggle(department)}
              onClose={handleClose}
            />
          </div>

          <div className={s.frame}>
            <Dropdown
              header={country}
              data={data.country}
              isOpen={openDropdown === country}
              onToggle={() => handleToggle(country)}
              onClose={handleClose}
            />
            <Dropdown
              header={status}
              data={data.status}
              isOpen={openDropdown === status}
              onToggle={() => handleToggle(status)}
              onClose={handleClose}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditUser;
