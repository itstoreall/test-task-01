import useDropdownState from '../../hooks/useDropdownState';
import DropdownSelectable from '../DropdownSelectable';
import Dropdown from '../Dropdown';
import s from './FilterHeading.module.scss';

const config = {
  heading:
    'Please add at least 3 departmetns to be able to proceed next steps.',
  dropdown: {
    country: 'country',
    status: 'status'
  }
};

const { country, status } = config.dropdown;

const FilterHeading = () => {
  const { openDropdown, handleToggle, handleClose } = useDropdownState();

  return (
    <div className={s.filterHeading}>
      <span className={s.heading}>{config.heading}</span>
      <div>
        <DropdownSelectable />
        <Dropdown
          header={country}
          isOpen={openDropdown === country}
          onToggle={() => handleToggle(country)}
          onClose={handleClose}
        />
        <Dropdown
          header={status}
          isOpen={openDropdown === status}
          onToggle={() => handleToggle(status)}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default FilterHeading;
