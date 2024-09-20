/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SelectArrowIcon from '../../assets/icon/SelectArrowIcon';
import useDataCheck from '../../hooks/useDataCheck';
import useDropdown from '../../hooks/useDropdown';
import * as gt from '../../types/global';
import s from './Dropdown.module.scss';

type SelectedItem = gt.DataItemType | boolean[] | null | undefined;

const config = {
  dropdown: {
    department: 'department',
    country: 'country',
    status: 'status'
  }
};

const { department, status } = config.dropdown;

const Dropdown: gt.DropdownType = props => {
  const {
    label,
    header,
    placeholder,
    data,
    isOpen,
    initSelectedItem,
    onChange,
    disabled = false
  } = props;

  const { onToggle, onClose, handleSelectedItem } = props;
  const initState = initSelectedItem || null;

  const [selectedItem, setSelectedItem] = useState<SelectedItem>(initState);
  const [searchTerm, setSearchTerm] = useState('');

  const { dropdownRef } = useDropdown({ isOpen, onClose });
  const { isDataItem } = useDataCheck();

  const isDepartment = label === department;
  const isStatus = label === status;

  useEffect(() => setSelectedItem(initSelectedItem), [initSelectedItem]);

  useEffect(() => {
    handleSelectedItem && handleSelectedItem(selectedItem as gt.DataItemType);
  }, [selectedItem]);

  const toggleHandler = () => !disabled && onToggle();

  const handleSelect = (item: gt.DataItemType) => {
    console.log('item:', item);
    setSelectedItem(item);
    onChange && onChange(item);
    setSearchTerm('');
    onClose();
  };

  const handleSearchChange = (e: gt.InputChangeEvent) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = (data as gt.DataItemType[]).filter(item =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const currentPlaceholder = selectedItem
    ? (selectedItem as gt.DataItemType).name
    : placeholder;

  // ---

  const symbolStyle = `${s.symbol} ${(isStatus || isDepartment) && s.expand}`;

  return (
    <form className={s.dropdownForm}>
      {header && <label className={s.label}>{header}</label>}

      <div className={s.select} ref={dropdownRef}>
        <input
          className={s.input}
          placeholder={currentPlaceholder}
          value={searchTerm}
          onClick={() => !isOpen && !disabled && onToggle()}
          onChange={handleSearchChange}
          disabled={disabled}
        />

        <span className={s.arrowButton} onClick={toggleHandler}>
          <SelectArrowIcon status={isOpen ? 'open' : 'close'} />
        </span>

        {isOpen && (
          <div className={s.dropdown}>
            <ul className={s.dropdownList}>
              {filteredData.length > 0 &&
                filteredData.map((item, idx) => (
                  <li
                    key={idx}
                    className={s.dropdownItem}
                    onClick={() => handleSelect(item)}
                  >
                    <span className={s.itemContent}>
                      {isDataItem(item) && (
                        <span className={symbolStyle}>
                          {isStatus ? item.value.slice(0, 3) : item.value}
                        </span>
                      )}

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

export default Dropdown;
