import { useState } from 'react';

const useDropdownState = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleToggle = (dropdownName: string) => {
    setOpenDropdown(prev => (prev === dropdownName ? null : dropdownName));
  };

  const handleClose = () => {
    setOpenDropdown(null);
  };

  return {
    openDropdown,
    handleToggle,
    handleClose
  };
};

export default useDropdownState;
