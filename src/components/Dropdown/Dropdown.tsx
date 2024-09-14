import { ReactElement } from 'react';
import SelectArrowIcon from '../../assets/icon/SelectArrowIcon';
import useDropdown from '../../hooks/useDropdown';
import s from './Dropdown.module.scss';

type DropdownProps = {
  header: string | null;
  isOpen: boolean;
  onToggle(): void;
  onClose(): void;
};

type DropdownType = (props: DropdownProps) => ReactElement;

const Dropdown: DropdownType = ({ header, isOpen, onToggle, onClose }) => {
  const { dropdownRef } = useDropdown({ isOpen, onClose });

  return (
    <form className={s.dropdownForm}>
      <label className={s.label}>{header}</label>

      <div className={s.select}>
        <input
          className={s.input}
          ref={dropdownRef}
          value={'Dropdown mock data'}
          onClick={onToggle}
        />

        <SelectArrowIcon status={isOpen ? 'open' : 'close'} />

        {isOpen && (
          <div className={s.dropdown}>
            <ul className={s.dropdownList}>
              <li className={s.dropdownItem} onClick={onClose}>
                <span className={s.itemContent}>
                  <span className={s.symbol}>D</span>
                  <span className={s.text}>{header}</span>
                </span>
              </li>
              <li className={s.dropdownItem} onClick={onClose}>
                <span className={s.itemContent}>
                  <span className={s.symbol}>D</span>
                  <span className={s.text}>{header}</span>
                </span>
              </li>
              <li className={s.dropdownItem} onClick={onClose}>
                <span className={s.itemContent}>
                  <span className={s.symbol}>D</span>
                  <span className={s.text}>{header}</span>
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default Dropdown;
