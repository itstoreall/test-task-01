import Dropdown from '../Dropdown';
import DropdownSelectable from '../DropdownSelectable';
import s from './FilterHeading.module.scss';

const config = {
  heading: 'Please add at least 3 departmetns to be able to proceed next steps.'
};

const { heading } = config;

const FilterHeading = () => {
  return (
    <div className={s.filterHeading}>
      <span className={s.heading}>{heading}</span>
      <div>
        <DropdownSelectable />
        <Dropdown />
        <Dropdown />
      </div>
    </div>
  );
};

export default FilterHeading;
