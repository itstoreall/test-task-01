import { ReactElement, useEffect, useState } from 'react';
import SelectArrowIcon from '../../assets/icon/SelectArrowIcon';
import CheckboxIcon from '../../assets/icon/CheckboxIcon';
import useDropdown from '../../hooks/useDropdown';
import s from './DropdownSelectable.module.scss';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

type DataItem = { name: string; value: string };

type DropdownProps = {
  header: string | null;
  placeholder: string;
  data: DataItem[];
  isOpen: boolean;
  onToggle(): void;
  onClose(): void;
};

type DropdownType = (props: DropdownProps) => ReactElement;

const DropdownSelectable: DropdownType = props => {
  const { header, placeholder, data, isOpen, onToggle, onClose } = props;

  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { dropdownRef } = useDropdown({ isOpen, onClose });

  useEffect(() => {
    setCheckedItems(Array(data.length).fill(false));
    setDataItems(data);
  }, [data]);

  const handleItemClick = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleSearchChange = (e: InputEvent) => {
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
      <label className={s.label}>{header}</label>

      <div className={s.select}>
        <input
          className={s.input}
          ref={dropdownRef}
          value={searchTerm}
          onClick={onToggle}
          onChange={handleSearchChange}
          placeholder={placeholder}
        />

        <SelectArrowIcon status={isOpen ? 'open' : 'close'} />

        {isOpen && (
          <div className={s.dropdown} ref={dropdownRef}>
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
