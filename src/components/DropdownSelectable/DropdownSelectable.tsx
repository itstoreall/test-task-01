/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useDropdown from '../../hooks/useDropdown';
import SelectArrowIcon from '../../assets/icon/SelectArrowIcon';
import CheckboxIcon from '../../assets/icon/CheckboxIcon';
import * as gt from '../../types/global';
import s from './DropdownSelectable.module.scss';

const DropdownSelectable: gt.DropdownType = props => {
  const {
    header,
    placeholder,
    data,
    isOpen,
    initSelectedItem,
    onToggle,
    onClose,
    onChange,
    disabled = false
  } = props;

  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);
  const [dataItems, setDataItems] = useState<gt.DataItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { dropdownRef } = useDropdown({ isOpen, onClose });

  const picked = checkedItems.filter(item => item === true).length;

  useEffect(() => setDataItems(data as gt.DataItem[]), [data]);

  useEffect(() => {
    setCurrentPlaceholder(picked ? `Selected(${picked})` : placeholder);
  }, [checkedItems]);

  useEffect(() => {
    initSelectedItem && setCheckedItems(initSelectedItem as boolean[]);
  }, [initSelectedItem]);

  // ---

  const handleItemCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    const selectedDepartments = dataItems
      .filter((_, i) => newCheckedItems[i])
      .map(item => item.name);

    onChange && onChange(selectedDepartments);
    setSearchTerm('');
  };

  const handleSearchChange = (e: gt.InputChangeEvent) => {
    setSearchTerm(e.target.value);
  };

  // ---

  const chosenData = dataItems.filter((_, index) => checkedItems[index]);

  const filteredData = dataItems.filter(
    (item, index) =>
      !checkedItems[index] &&
      item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // ---

  const selectedStyle = picked ? s.selected : '';
  const disabledStyle = disabled ? s.disabled : '';
  const placeholderStyle = `${s.input} ${selectedStyle} ${disabledStyle}`;

  return (
    <form className={s.dropdownForm}>
      {header && <label className={s.label}>{header}</label>}

      <div className={s.select} ref={dropdownRef}>
        <input
          className={placeholderStyle}
          placeholder={currentPlaceholder}
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
                  onClick={() => handleItemCheck(dataItems.indexOf(item))}
                >
                  <span className={s.itemContent}>
                    <span className={s.symbol}>
                      <CheckboxIcon isChecked={true} />
                    </span>

                    <span className={s.textWrap}>
                      <span className={s.text}>{item.name}</span>
                    </span>
                  </span>
                </li>
              ))}

              {filteredData.map((item, index) => (
                <li
                  key={`filtered-${index}`}
                  className={s.dropdownItem}
                  onClick={() => handleItemCheck(dataItems.indexOf(item))}
                >
                  <span className={s.itemContent}>
                    <span className={s.symbol}>
                      <CheckboxIcon isChecked={false} />
                    </span>

                    <span className={s.textWrap}>
                      <span className={s.text}>{item.name}</span>
                    </span>
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
