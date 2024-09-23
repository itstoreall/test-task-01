import { useEffect, useState, useRef } from 'react';
import * as gt from '../types/global';

const useDropdownContent = (data: gt.DataItemType[]) => {
  const dropdownContentRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const content = dropdownContentRef.current;
    if (!content) return;
    setIsOverflow(content.getBoundingClientRect().height >= 160);
  }, [data]);

  return { dropdownContentRef, isOverflow };
};

export default useDropdownContent;
