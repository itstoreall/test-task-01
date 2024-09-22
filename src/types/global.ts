import { ReactElement, ReactNode } from 'react';

export type ChildrenProps = { children: ReactNode };

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

export type SelectedArg = string[] | DataItemType;

export type DropdownOnChange = (selected: SelectedArg) => void;

export type DropdownProps = {
  label?: string;
  header: string | null;
  placeholder?: string;
  data: DataType;
  isOpen: boolean;
  onToggle(): void;
  onClose(): void;
  initSelectedItem?: DataItem | boolean[] | null;
  handleSelectedItem?: (user: DataItemType) => void;
  disabled?: boolean;
  onChange?: (selected: string[] | DataItemType) => void;
};

export type DropdownType = (props: DropdownProps) => ReactElement;

// ---

export type ModalContext = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export type DataContext = {
  users: UserDataItem[];
  departments: DataItem[];
  countries: DataItem[];
  statuses: DataItem[];
  createUser: (newUser: UserDataItem) => void;
  updateUsers: (newUsers: UserDataItem[]) => void;
  deleteUser: (useName: string) => boolean;
};
