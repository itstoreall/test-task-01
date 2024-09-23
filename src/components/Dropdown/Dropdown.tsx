/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useDropdownContent from '../../hooks/useDropdownContent';
import useDataCheck from '../../hooks/useDataCheck';
import useDropdown from '../../hooks/useDropdown';
import SelectArrowIcon from '../../assets/icon/SelectArrowIcon';
import * as gt from '../../types/global';
import s from './Dropdown.module.scss';

type SelectedItem = gt.DataItemType | boolean[] | null | undefined;

const config = {
  dropdown: {
    user: 'user',
    department: 'department',
    country: 'country',
    status: 'status'
  },
  placeholderOnFocus: 'Type to search...'
};

const { user, department, status } = config.dropdown;
const { placeholderOnFocus } = config;

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
  const initPlaceholder = initSelectedItem
    ? (initSelectedItem as gt.DataItemType).name
    : placeholder;

  const [currentPlaceholder, setCurrentPlaceholder] = useState(initPlaceholder);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(initState);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = (data as gt.DataItemType[]).filter(item =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const { dropdownContentRef, isOverflow } = useDropdownContent(filteredData);
  const { dropdownRef } = useDropdown({ isOpen, onClose });
  const { isDataItem } = useDataCheck();

  const isUser = label === user;
  const isDepartment = label === department;
  const isStatus = label === status;

  // ---

  useEffect(() => setSelectedItem(initSelectedItem), [initSelectedItem]);

  useEffect(() => setCurrentPlaceholder(initPlaceholder), [initPlaceholder]);

  useEffect(() => {
    handleSelectedItem && handleSelectedItem(selectedItem as gt.DataItemType);
    if (!isUser || !selectedItem) return;
    setCurrentPlaceholder((selectedItem as gt.DataItemType).name);
  }, [selectedItem]);

  // ---

  const toggleHandler = () => !disabled && onToggle();

  const handleSelect = (item: gt.DataItemType) => {
    setSelectedItem(item);
    onChange && onChange(item);
    setSearchTerm('');
    onClose();
  };

  const handleSearchChange = (e: gt.InputChangeEvent) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    setCurrentPlaceholder(placeholderOnFocus);
  };

  const handleBlur = () => {
    const placeholder =
      isUser && selectedItem
        ? (selectedItem as gt.DataItemType).name
        : initPlaceholder;
    setCurrentPlaceholder(placeholder);
  };

  // ---

  const disabledStyle = disabled ? s.disabled : '';
  const selectedStyle = selectedItem && !isOpen ? s.selected : '';
  const placeholderStyle = `${s.input} ${disabledStyle} ${selectedStyle}`;
  const symbolStyle = `${s.symbol} ${(isStatus || isDepartment) && s.expand}`;
  const scrollbarStyle = !isStatus ? s.scrollbar : '';
  const overflowStyle = isOverflow ? scrollbarStyle : '';
  const dropdownContentStyle = `${s.dropdownContent} ${overflowStyle}`;

  return (
    <form className={s.dropdownForm}>
      {header && <label className={s.label}>{header}</label>}

      <div className={s.select} ref={dropdownRef}>
        <input
          className={placeholderStyle}
          placeholder={currentPlaceholder}
          value={searchTerm}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={() => !isOpen && !disabled && onToggle()}
          onChange={handleSearchChange}
          disabled={disabled}
        />

        <span className={s.arrowButton} onClick={toggleHandler}>
          <SelectArrowIcon status={isOpen ? 'open' : 'close'} />
        </span>

        {isOpen && (
          <div className={s.dropdown}>
            <div className={dropdownContentStyle} ref={dropdownContentRef}>
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
          </div>
        )}
      </div>
    </form>
  );
};

export default Dropdown;
