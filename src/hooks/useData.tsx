import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import * as gt from '../types/global';

const useData = (): gt.DataContext => {
  const context = useContext(DataContext);
  if (!context) throw new Error('No DataProvider!');
  return context;
};

export default useData;
