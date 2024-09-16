/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SelectArrowIcon from '../../assets/icon/SelectArrowIcon';
import useDataCheck from '../../hooks/useDataCheck';
import useDropdown from '../../hooks/useDropdown';
import * as gt from '../../types/global';
import s from './Dropdown.module.scss';

type SelectedItem = gt.DataItemType | null | undefined;

const Dropdown: gt.DropdownType = props => {
  const {
    header,
    placeholder,
    data,
    isOpen,
    initSelectedItem,
    disabled = false
  } = props;

  const { onToggle, onClose, handleSelectedItem } = props;
  const initState = initSelectedItem || null;

  const [selectedItem, setSelectedItem] = useState<SelectedItem>(initState);

  const { dropdownRef } = useDropdown({ isOpen, onClose });
  const { isDataItem } = useDataCheck();

  useEffect(() => setSelectedItem(initSelectedItem), [initSelectedItem]);

  useEffect(() => {
    handleSelectedItem && handleSelectedItem(selectedItem as gt.DataItemType);
  }, [selectedItem]);

  const handleSelect = (item: gt.DataItemType) => {
    setSelectedItem(item);
    onClose();
  };

  const toggleHandler = () => !disabled && onToggle();

  return (
    <form className={s.dropdownForm}>
      {header && <label className={s.label}>{header}</label>}

      <div className={s.select} ref={dropdownRef}>
        <input
          className={s.input}
          placeholder={placeholder}
          value={selectedItem ? selectedItem.name : ''}
          onClick={() => !isOpen && !disabled && onToggle()}
          disabled={disabled}
          readOnly
        />

        <span className={s.arrowButton} onClick={toggleHandler}>
          <SelectArrowIcon status={isOpen ? 'open' : 'close'} />
        </span>

        {isOpen && (
          <div className={s.dropdown}>
            <ul className={s.dropdownList}>
              {data.map((item, idx) => (
                <li
                  key={idx}
                  className={s.dropdownItem}
                  onClick={() => handleSelect(item)}
                >
                  <span className={s.itemContent}>
                    {isDataItem(item) && (
                      <span className={s.symbol}>{item.value}</span>
                    )}
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

export default Dropdown;
