import useDropdownState from '../../hooks/useDropdownState';
import useData from '../../hooks/useData';
import DropdownSelectable from '../DropdownSelectable';
import Dropdown from '../Dropdown';
import s from './FilterHeading.module.scss';
import BinIcon from '../../assets/icon/BinIcon';
import Button from '../Button';

const config = {
  heading:
    'Please add at least 3 departmetns to be able to proceed next steps.',
  dropdownSelectable: {
    departments: 'departments',
    departmentsPlaceholder: 'Select departments'
  },
  dropdown: {
    country: 'country',
    status: 'status',
    countryPlaceholder: 'Select country',
    statusPlaceholder: 'All Statuses'
  },
  button: {
    addUser: 'Add User'
  }
};

const { departments, departmentsPlaceholder } = config.dropdownSelectable;
const { countryPlaceholder, statusPlaceholder } = config.dropdown;
const { country, status } = config.dropdown;
const { addUser } = config.button;

const FilterHeading = () => {
  const { openDropdown, handleToggle, handleClose } = useDropdownState();

  const data = useData();

  return (
    <div className={s.filterHeading}>
      <span className={s.heading}>{config.heading}</span>

      <div className={s.filterBlock}>
        <DropdownSelectable
          header={null}
          placeholder={departmentsPlaceholder}
          data={data.department}
          isOpen={openDropdown === departments}
          onToggle={() => handleToggle(departments)}
          onClose={handleClose}
        />
        <Dropdown
          header={null}
          placeholder={countryPlaceholder}
          data={data.country}
          isOpen={openDropdown === country}
          onToggle={() => handleToggle(country)}
          onClose={handleClose}
        />
        <Dropdown
          header={null}
          placeholder={statusPlaceholder}
          data={data.status}
          isOpen={openDropdown === status}
          onToggle={() => handleToggle(status)}
          onClose={handleClose}
        />

        <div className={s.buttonBlock}>
          <button className={s.deleteButton}>
            <BinIcon />
          </button>

          <Button content={addUser} />
        </div>
      </div>
    </div>
  );
};

export default FilterHeading;
