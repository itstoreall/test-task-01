import { useEffect, useState } from 'react';
import useDropdown from '../../hooks/useDropdown';
import SelectArrowIcon from '../../assets/icon/SelectArrowIcon';
import CheckboxIcon from '../../assets/icon/CheckboxIcon';
import * as gt from '../../types/global';
import s from './DropdownSelectable.module.scss';

const DropdownSelectable: gt.DropdownType = props => {
  const { header, placeholder, data, isOpen, onToggle, onClose } = props;

  const [dataItems, setDataItems] = useState<gt.DataItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { dropdownRef } = useDropdown({ isOpen, onClose });

  useEffect(() => {
    setCheckedItems(Array(data.length).fill(false));
    setDataItems(data as gt.DataItem[]);
  }, [data]);

  const handleItemClick = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleSearchChange = (e: gt.InputChangeEvent) => {
    setSearchTerm(e.target.value);
  };

  const chosenData = dataItems.filter((_, index) => checkedItems[index]);

  const filteredData = dataItems.filter(
    (item, index) =>
      !checkedItems[index] &&
      item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <form className={s.dropdownForm}>
      {header && <label className={s.label}>{header}</label>}

      <div className={s.select} ref={dropdownRef}>
        <input
          className={s.input}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={() => !isOpen && onToggle()}
        />

        <span className={s.arrowButton} onClick={onToggle}>
          <SelectArrowIcon status={isOpen ? 'open' : 'close'} />
        </span>

        {isOpen && (
          <div className={s.dropdown}>
            <ul className={s.dropdownList}>
              {chosenData.map((item, index) => (
                <li
                  key={`chosen-${index}`}
                  className={s.dropdownItem}
                  onClick={e => handleItemClick(dataItems.indexOf(item))}
                >
                  <span className={s.itemContent}>
                    <span className={s.symbol}>
                      <CheckboxIcon isChecked={true} />
                    </span>
                    <span className={s.text}>{item.name}</span>
                  </span>
                </li>
              ))}

              {filteredData.map((item, index) => (
                <li
                  key={`filtered-${index}`}
                  className={s.dropdownItem}
                  onClick={e => handleItemClick(dataItems.indexOf(item))}
                >
                  <span className={s.itemContent}>
                    <span className={s.symbol}>
                      <CheckboxIcon isChecked={false} />
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
