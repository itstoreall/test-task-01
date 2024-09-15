import { useState } from 'react';
import useDropdownState from '../../hooks/useDropdownState';
import useData from '../../hooks/useData';
import * as gt from '../../types/global';
import Input from '../Input';
import Dropdown from '../Dropdown';
import s from './Pages.module.scss';

type SelectedUser = gt.UserDataItem | null;

type HandleDropdownChange = (
  field: keyof gt.UserDataItem,
  value: gt.DataItemType
) => void;

const config = {
  title: 'Edit User',
  subtitle: 'User Information',
  input: {
    user: 'user',
    name: 'full name',
    userPlaceholder: 'User name'
  },
  dropdown: {
    department: 'department',
    country: 'country',
    status: 'status',
    userPlaceholder: 'Select user',
    departmentPlaceholder: 'Select department',
    countryPlaceholder: 'Select country',
    statusPlaceholder: 'Select status'
  }
};

const { title, subtitle, input, dropdown } = config;
const { user, name } = config.input;
const { department, country, status } = config.dropdown;

const EditUser = () => {
  const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);

  const { openDropdown, handleToggle, handleClose } = useDropdownState();
  const data = useData();

  const handleUserSelect = (user: gt.UserDataItem) => {
    setSelectedUser(user);
    handleClose();
  };

  const handleDropdownChange: HandleDropdownChange = (field, value) =>
    selectedUser && setSelectedUser({ ...selectedUser, [field]: value });

  return (
    <main className={s.main}>
      <section className={`${s.content} ${s.editUser}`}>
        <h2>{title}</h2>

        <div className={s.ownerBlock}>
          <Dropdown
            header={user}
            placeholder={dropdown.userPlaceholder}
            data={data.user}
            isOpen={openDropdown === user}
            onToggle={() => handleToggle(user)}
            onClose={handleClose}
            handleSelectedItem={handleUserSelect}
          />
        </div>

        <div className={s.companyInfoBlock}>
          <h3 className={s.subtitle}>{subtitle}</h3>

          <div className={s.frame}>
            <Input
              header={name}
              placeholder={input.userPlaceholder}
              value={selectedUser?.name || ''}
              readOnly
            />

            <Dropdown
              header={department}
              placeholder={dropdown.departmentPlaceholder}
              data={data.department}
              isOpen={openDropdown === department}
              onToggle={() => handleToggle(department)}
              onClose={handleClose}
              initSelectedItem={selectedUser?.department ?? null}
              handleSelectedItem={item =>
                handleDropdownChange('department', item)
              }
            />
          </div>

          <div className={s.frame}>
            <Dropdown
              header={country}
              placeholder={dropdown.countryPlaceholder}
              data={data.country}
              isOpen={openDropdown === country}
              onToggle={() => handleToggle(country)}
              onClose={handleClose}
              initSelectedItem={selectedUser?.country ?? null}
              handleSelectedItem={item => handleDropdownChange('country', item)}
            />
            <Dropdown
              header={status}
              placeholder={dropdown.statusPlaceholder}
              data={data.status}
              isOpen={openDropdown === status}
              onToggle={() => handleToggle(status)}
              onClose={handleClose}
              initSelectedItem={selectedUser?.status ?? null}
              handleSelectedItem={item => handleDropdownChange('status', item)}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EditUser;
