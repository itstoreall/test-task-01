import useDropdownState from '../../hooks/useDropdownState';
import DropdownSelectable from '../DropdownSelectable';
import Dropdown from '../Dropdown';
import s from './FilterHeading.module.scss';

const config = {
  heading:
    'Please add at least 3 departmetns to be able to proceed next steps.',
  dropdownSelectable: {
    departments: 'departments',
    placeholder: 'Select departments'
  },
  dropdown: {
    country: 'country',
    status: 'status'
  }
};

const departmentsData = [
  { name: 'Human Resources', value: 'HR' },
  { name: 'Finance', value: 'FIN' },
  { name: 'Information Technology', value: 'IT' },
  { name: 'Marketing', value: 'MKT' },
  { name: 'Sales', value: 'SAL' },
  { name: 'Customer Support', value: 'CS' },
  { name: 'Research and Development', value: 'R&D' },
  { name: 'Operations', value: 'OPS' },
  { name: 'Legal', value: 'LEG' },
  { name: 'Product Management', value: 'PM' }
];

const { departments, placeholder } = config.dropdownSelectable;
const { country, status } = config.dropdown;

const FilterHeading = () => {
  const { openDropdown, handleToggle, handleClose } = useDropdownState();

  return (
    <div className={s.filterHeading}>
      <span className={s.heading}>{config.heading}</span>
      <div>
        <DropdownSelectable
          header={null}
          placeholder={placeholder}
          data={departmentsData}
          isOpen={openDropdown === departments}
          onToggle={() => handleToggle(departments)}
          onClose={handleClose}
        />
        <Dropdown
          header={null}
          isOpen={openDropdown === country}
          onToggle={() => handleToggle(country)}
          onClose={handleClose}
        />
        <Dropdown
          header={null}
          isOpen={openDropdown === status}
          onToggle={() => handleToggle(status)}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default FilterHeading;
