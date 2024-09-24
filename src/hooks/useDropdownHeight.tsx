import { useEffect, useState, useRef } from 'react';
import * as gt from '../types/global';

const useDropdownHeight = (data: gt.DataItemType[]) => {
  const dropdownListRef = useRef<HTMLUListElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const content = dropdownListRef.current;
    if (!content) return;
    setIsOverflow(content.getBoundingClientRect().height > 160);
  }, [data]);

  return { dropdownListRef, isOverflow };
};

export default useDropdownHeight;
