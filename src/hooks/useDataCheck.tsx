import * as gt from '../types/global';

const useDataCheck = () => {
  const isDataItem = (item: any): item is gt.DataItem =>
    item && typeof item.name === 'string' && typeof item.value === 'string';

  const isUserDataItem = (item: any): item is gt.UserDataItem =>
    item &&
    typeof item.name === 'string' &&
    isDataItem(item.status) &&
    isDataItem(item.department) &&
    isDataItem(item.country);

  return { isDataItem, isUserDataItem };
};

export default useDataCheck;
