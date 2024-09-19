import useDropdownState from '../../hooks/useDropdownState';
import useData from '../../hooks/useData';
import * as gt from '../../types/global';
import DropdownSelectable from '../DropdownSelectable';
import Dropdown from '../Dropdown';
import BinIcon from '../../assets/icon/BinIcon';
import Button from '../Button';
import s from './FilterHeading.module.scss';

type FilterHeadingProps = {
  selectedDepartments: string[];
  selectedCountry: gt.DataItem | null;
  selectedStatus: gt.DataItem | null;
  filterDepartments: (sevected: string[]) => void;
  filterCountry: (sevected: gt.DataItem) => void;
  filterStatus: (sevected: gt.DataItem) => void;
  resetSecondaryFilters: () => void;
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
    filterStatus,
    resetSecondaryFilters
  } = props;

  const { openDropdown, handleToggle, handleClose } = useDropdownState();

  const data = useData();

  const isDisabled = selectedDepartments.length < departmentsLimit;

  // ---

  const handleDepartments: gt.DropdownOnChange = selected =>
    filterDepartments(selected as string[]);

  const handleCountry: gt.DropdownOnChange = selected =>
    filterCountry(selected as gt.DataItem);

  const handleStatus: gt.DropdownOnChange = selected =>
    filterStatus(selected as gt.DataItem);

  // ---

  const initDepartments =
    selectedDepartments.length === 0
      ? Array(data.department.length).fill(false)
      : null;

  const initCountry = isDisabled ? null : selectedCountry;

  const initStatus = isDisabled ? null : selectedStatus;

  return (
    <div className={s.filterHeading}>
      <span className={s.heading}>{config.heading}</span>

      <div className={s.filterBlock}>
        <DropdownSelectable
          header={null}
          placeholder={departmentsPlaceholder}
          data={data.department}
          isOpen={openDropdown === departments}
          initSelectedItem={initDepartments}
          onToggle={() => handleToggle(departments)}
          onClose={handleClose}
          onChange={handleDepartments}
        />
        <Dropdown
          label={country}
          header={null}
          placeholder={countryPlaceholder}
          data={data.country}
          isOpen={openDropdown === country}
          initSelectedItem={initCountry}
          onToggle={() => handleToggle(country)}
          onClose={handleClose}
          onChange={handleCountry}
          disabled={isDisabled}
        />
        <Dropdown
          label={status}
          header={null}
          placeholder={statusPlaceholder}
          data={data.status}
          isOpen={openDropdown === status}
          initSelectedItem={initStatus}
          onToggle={() => handleToggle(status)}
          onClose={handleClose}
          onChange={handleStatus}
          disabled={isDisabled}
        />

        <div className={s.buttonBlock}>
          <button className={s.resetButton} onClick={resetSecondaryFilters}>
            <BinIcon />
          </button>

          <Button content={addUser} />
        </div>
      </div>
    </div>
  );
};

export default FilterHeading;
