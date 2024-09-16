/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useDropdownState from '../../hooks/useDropdownState';
import useData from '../../hooks/useData';
import * as gt from '../../types/global';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Button from '../Button';
import s from './Pages.module.scss';

type SelectedUser = gt.UserDataItem | null;

type HandleUserSelect = (item: gt.DataItemType) => void;

type Key = keyof gt.UserDataItem;

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
    departmentPlaceholder: 'User department',
    countryPlaceholder: 'User country',
    statusPlaceholder: 'User status'
  },
  button: {
    undo: 'undo',
    save: 'save'
  }
};

const { title, subtitle, input, dropdown, button } = config;
const { user, name } = config.input;
const { department, country, status } = config.dropdown;

const EditUser = () => {
  const [users, setUsers] = useState<gt.UserDataItem[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);
  const [isDataChanges, setIsDataChanges] = useState(false);

  const { openDropdown, handleToggle, handleClose } = useDropdownState();

  const data = useData();

  useEffect(() => {
    setUsers(data.user);
  }, []);

  useEffect(() => {
    const initUsers = users?.find(user => user.name === selectedUser?.name);
    const isChanged = isUserDataChange(initUsers!, selectedUser!);
    if (isChanged && !isDataChanges) {
      setIsDataChanges(true);
    } else if (!isChanged && isDataChanges) {
      setIsDataChanges(false);
    }
  }, [selectedUser]);

  type IsUserDataChange = (
    init: gt.UserDataItem,
    selected: gt.UserDataItem
  ) => boolean;

  const isUserDataChange: IsUserDataChange = (init, selected) => {
    let isChanged = false;
    for (const key in init) {
      if (init.hasOwnProperty(key) && selected.hasOwnProperty(key)) {
        const initValue = (init[key as Key] as gt.DataItem).value;
        const selectedValue = (selected[key as Key] as gt.DataItem).value;
        if (initValue !== selectedValue) isChanged = true;
      }
    }
    return isChanged;
  };

  const handleUserSelect = (user: gt.UserDataItem) => {
    setSelectedUser(user);
    setIsDataChanges(false);
    handleClose();
  };

  const undoChanges = () => {
    if (!selectedUser || !users || !isDataChanges) return;
    const initUsers = users.find(user => user.name === selectedUser.name);
    if (initUsers) {
      setSelectedUser(initUsers);
      setIsDataChanges(false);
    }
  };

  const saveChanges = () => {
    if (!isDataChanges || !users || !selectedUser) return;
    const updatedUser = users.map(user =>
      user.name === selectedUser.name ? selectedUser : user
    );
    setIsDataChanges(false);
    setUsers(updatedUser);
  };

  const setDepartment = (item: gt.DataItemType) =>
    handleDropdownChange(department as keyof gt.UserDataItem, item);

  const setCountry = (item: gt.DataItemType) =>
    handleDropdownChange(country as keyof gt.UserDataItem, item);

  const setStatus = (item: gt.DataItemType) =>
    handleDropdownChange(status as keyof gt.UserDataItem, item);

  const handleDropdownChange: HandleDropdownChange = (field, value) =>
    selectedUser && setSelectedUser({ ...selectedUser, [field]: value });

  // ---

  const activeSave = isDataChanges ? s.active : '';
  const undoButtonStyle = `${s.buttonBox} ${s[button.undo]}`;
  const saveButtonStyle = `${s.buttonBox} ${s[button.save]} ${activeSave}`;

  return (
    <main className={s.main}>
      <section className={`${s.content} ${s.editUser}`}>
        <h2>{title}</h2>

        <div className={s.ownerBlock}>
          <Dropdown
            header={user}
            placeholder={dropdown.userPlaceholder}
            data={users || []}
            isOpen={openDropdown === user}
            onToggle={() => handleToggle(user)}
            onClose={handleClose}
            handleSelectedItem={handleUserSelect as HandleUserSelect}
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
              handleSelectedItem={setDepartment}
              disabled={!selectedUser}
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
              handleSelectedItem={setCountry}
              disabled={!selectedUser}
            />

            <Dropdown
              header={status}
              placeholder={dropdown.statusPlaceholder}
              data={data.status}
              isOpen={openDropdown === status}
              onToggle={() => handleToggle(status)}
              onClose={handleClose}
              initSelectedItem={selectedUser?.status ?? null}
              handleSelectedItem={setStatus}
              disabled={!selectedUser}
            />
          </div>
        </div>

        <div className={`${s.buttonBlock}`}>
          <span className={undoButtonStyle}>
            {isDataChanges && (
              <Button content={button.undo} onClick={undoChanges} />
            )}
          </span>
          <span className={saveButtonStyle}>
            <Button content={button.save} onClick={saveChanges} />
          </span>
        </div>
      </section>
    </main>
  );
};

export default EditUser;
