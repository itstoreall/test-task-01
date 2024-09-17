import useEditUser from '../../hooks/useEditUser';
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
    data,
    users,
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
