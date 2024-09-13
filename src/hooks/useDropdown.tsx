import { useEffect, useRef } from 'react';

type UseDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const useDropdown = ({ isOpen, onClose }: UseDropdownProps) => {
  const dropdownRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        onClose();
    };

    isOpen
      ? document.addEventListener('mousedown', handleClickOutside)
      : document.removeEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return {
    dropdownRef
  };
};

export default useDropdown;
