import { ReactElement, useEffect, useState } from 'react';
import SelectArrowIcon from '../../assets/icon/SelectArrowIcon';
import CheckboxIcon from '../../assets/icon/CheckboxIcon';
import useDropdown from '../../hooks/useDropdown';
import s from './DropdownSelectable.module.scss';

type DropdownProps = {
  header: string | null;
  data: { name: string; value: string }[];
  isOpen: boolean;
  onToggle(): void;
  onClose(): void;
};

type DropdownType = (props: DropdownProps) => ReactElement;

const DropdownSelectable: DropdownType = props => {
  const { header, data, isOpen, onToggle, onClose } = props;

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  const { dropdownRef } = useDropdown({ isOpen, onClose });

  useEffect(() => setCheckedItems(Array(data.length).fill(false)), [data]);

  const handleItemClick = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

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
          <div className={s.dropdown} ref={dropdownRef}>
            <ul className={s.dropdownList}>
              {data.map((item, index) => (
                <li
                  key={index}
                  className={s.dropdownItem}
                  onClick={() => handleItemClick(index)}
                >
                  <span className={s.itemContent}>
                    <span className={s.symbol}>
                      <CheckboxIcon isChecked={checkedItems[index]} />
                    </span>
                    <span className={s.text}>{item.name}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default DropdownSelectable;
