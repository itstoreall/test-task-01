import useDropdownState from '../../hooks/useDropdownState';
import useData from '../../hooks/useData';
import * as gt from '../../types/global';
import DropdownSelectable from '../DropdownSelectable';
import Dropdown from '../Dropdown';
import BinIcon from '../../assets/icon/BinIcon';
import Button from '../Button';
import s from './FilterHeading.module.scss';

type FilterHeadingProps = {
  selectedDepartments: number;
  selectedCountry: gt.DataItem | null;
  selectedStatus: gt.DataItem | null;
  filterDepartments: (sevected: string[]) => void;
  filterCountry: (sevected: gt.DataItem) => void;
  filterStatus: (sevected: gt.DataItem) => void;
};

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
    statusPlaceholder: 'Select status'
  },
  button: {
    addUser: 'Add User'
  },
  departmentsLimit: 3
};

const { departmentsLimit } = config;
const { departments, departmentsPlaceholder } = config.dropdownSelectable;
const { countryPlaceholder, statusPlaceholder } = config.dropdown;
const { country, status } = config.dropdown;
const { addUser } = config.button;

const FilterHeading = (props: FilterHeadingProps) => {
  const {
    selectedDepartments,
    selectedCountry,
    selectedStatus,
    filterDepartments,
    filterCountry,
    filterStatus
  } = props;

  const { openDropdown, handleToggle, handleClose } = useDropdownState();

  const data = useData();

  const isDisabled = selectedDepartments < departmentsLimit;

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
          onChange={(selected: string[]) => filterDepartments(selected)}
        />
        <Dropdown
          label={country}
          header={null}
          placeholder={countryPlaceholder}
          data={data.country}
          isOpen={openDropdown === country}
          initSelectedItem={isDisabled ? null : selectedCountry}
          onToggle={() => handleToggle(country)}
          onClose={handleClose}
          onChange={(selected: gt.DataItem) => filterCountry(selected)}
          disabled={isDisabled}
        />
        <Dropdown
          label={status}
          header={null}
          placeholder={statusPlaceholder}
          data={data.status}
          isOpen={openDropdown === status}
          initSelectedItem={isDisabled ? null : selectedStatus}
          onToggle={() => handleToggle(status)}
          onClose={handleClose}
          onChange={(selected: gt.DataItem) => filterStatus(selected)}
          disabled={isDisabled}
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
