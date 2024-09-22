import useUserList from '../../hooks/useUserList';
import useModal from '../../hooks/useModal';
import useData from '../../hooks/useData';
import * as gt from '../../types/global';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Button from '../Button';
import s from './AccountSettings.module.scss';

const config = {
  title: 'Add User',
  input: {
    user: 'user',
    name: 'full name',
    userPlaceholder: 'Enter full name'
  },
  dropdown: {
    department: 'department',
    country: 'country',
    status: 'status',
    userPlaceholder: 'Select user',
    departmentPlaceholder: 'Select department',
    countryPlaceholder: 'Select country',
    statusPlaceholder: 'Select status'
  },
  button: {
    cancel: 'cancel',
    add: 'add'
  }
};

const { title, input, dropdown, button } = config;

const AccountSettings = () => {
  const modal = useModal();

  const {
    userName,
    department,
    country,
    status,
    openDropdown,
    error,
    handleName,
    handleDepartment,
    handleCountry,
    handleStatus,
    handleToggle,
    handleClose,
    addUser
  } = useUserList();

  const data = useData();

  const createUser = () => addUser() && modal.closeModal();

  return (
    <div className={s.accountSettingsBlock}>
      <h3 className={s.modalTitle}>{title}</h3>

      <div className={s.frame}>
        <Input
          header={config.input.name}
          placeholder={input.userPlaceholder}
          value={userName}
          onChange={handleName}
        />

        <Dropdown
          label={dropdown.department}
          header={dropdown.department}
          placeholder={dropdown.departmentPlaceholder}
          data={data.departments}
          isOpen={openDropdown === dropdown.department}
          initSelectedItem={(department as gt.DataItem) ?? null}
          onToggle={() => handleToggle(dropdown.department)}
          onClose={handleClose}
          handleSelectedItem={handleDepartment}
        />
      </div>

      <div className={s.frame}>
        <Dropdown
          label={dropdown.country}
          header={dropdown.country}
          placeholder={dropdown.countryPlaceholder}
          data={data.countries}
          isOpen={openDropdown === dropdown.country}
          initSelectedItem={(country as gt.DataItem) ?? null}
          onToggle={() => handleToggle(dropdown.country)}
          onClose={handleClose}
          handleSelectedItem={handleCountry}
        />

        <Dropdown
          label={dropdown.status}
          header={dropdown.status}
          placeholder={dropdown.statusPlaceholder}
          data={data.statuses}
          isOpen={openDropdown === dropdown.status}
          initSelectedItem={(status as gt.DataItem) ?? null}
          onToggle={() => handleToggle(dropdown.status)}
          onClose={handleClose}
          handleSelectedItem={handleStatus}
        />
      </div>

      <div className={`${s.buttonBlock}`}>
        <span className={`${s.buttonBox} ${s[button.cancel]}`}>
          <Button content={button.cancel} onClick={() => modal.closeModal()} />
        </span>

        <span className={`${s.buttonBox} ${s[button.add]}`}>
          <Button content={button.add} onClick={createUser} />
        </span>

        {error && <span className={s.error}>{error}</span>}
      </div>
    </div>
  );
};

export default AccountSettings;
