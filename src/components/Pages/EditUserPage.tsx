import useEditUser from '../../hooks/useEditUser';
import useData from '../../hooks/useData';
import * as gt from '../../types/global';
import Input from '../Input';
import Dropdown from '../Dropdown';
import Button from '../Button';
import s from './Pages.module.scss';

type HandleUserSelect = (item: gt.DataItemType) => void;

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
  const {
    // data,
    // users,
    selectedUser,
    isDataChanges,
    openDropdown,
    handleToggle,
    handleClose,
    handleUserSelect,
    undoChanges,
    saveChanges,
    setDepartment,
    setCountry,
    setStatus
  } = useEditUser();

  const data = useData();

  const activeSave = isDataChanges ? s.active : '';
  const undoButtonStyle = `${s.buttonBox} ${s[button.undo]}`;
  const saveButtonStyle = `${s.buttonBox} ${s[button.save]} ${activeSave}`;

  return (
    <main className={s.main}>
      <section className={`${s.content} ${s.editUser}`}>
        <h2>{title}</h2>

        <div className={s.ownerBlock}>
          <Dropdown
            label={user}
            header={user}
            placeholder={dropdown.userPlaceholder}
            data={data.users || []}
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
              disabled
              readOnly
            />

            <Dropdown
              label={department}
              header={department}
              placeholder={dropdown.departmentPlaceholder}
              data={data.departments}
              isOpen={openDropdown === department}
              initSelectedItem={selectedUser?.department ?? null}
              onToggle={() => handleToggle(department)}
              onClose={handleClose}
              handleSelectedItem={setDepartment}
              disabled={!selectedUser}
            />
          </div>

          <div className={s.frame}>
            <Dropdown
              label={country}
              header={country}
              placeholder={dropdown.countryPlaceholder}
              data={data.countries}
              isOpen={openDropdown === country}
              initSelectedItem={selectedUser?.country ?? null}
              onToggle={() => handleToggle(country)}
              onClose={handleClose}
              handleSelectedItem={setCountry}
              disabled={!selectedUser}
            />

            <Dropdown
              label={status}
              header={status}
              placeholder={dropdown.statusPlaceholder}
              data={data.statuses}
              isOpen={openDropdown === status}
              initSelectedItem={selectedUser?.status ?? null}
              onToggle={() => handleToggle(status)}
              onClose={handleClose}
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
