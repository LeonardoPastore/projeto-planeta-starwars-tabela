import { useState } from 'react';

const useClickEvent = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleClickAdd = (information) => {
    setValue((prevValue) => [...prevValue, information]);
  };

  const handleClickRemove = (infoFilter) => {
    setValue((prevValue) => prevValue.filter((item) => item !== infoFilter));
  };

  const handleClickRemoveAll = () => {
    setValue([]);
  };

  return {
    value,
    handleClickAdd,
    handleClickRemove,
    handleClickRemoveAll,
  };
};

export default useClickEvent;
