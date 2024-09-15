import { ReactElement } from 'react';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type DataItem = { name: string; value: string };

export type UserDataItem = {
  name: string;
  status: DataItem;
  department: DataItem;
  country: DataItem;
};

export type DataItemType = DataItem | UserDataItem;

// ---

export type DataType = DataItem[] | UserDataItem[];

export type DropdownProps = {
  header: string | null;
  placeholder?: string;
  data: DataType;
  isOpen: boolean;
  onToggle(): void;
  onClose(): void;
  initSelectedItem?: DataItem | null;
  handleSelectedItem?: (user: UserDataItem) => void;
};

export type DropdownType = (props: DropdownProps) => ReactElement;
