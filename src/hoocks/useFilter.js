import { useState } from 'react';

const useFilterInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const columnOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const [options, setOptions] = useState(columnOptions);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const selectOptions = (selectedOption) => {
    const updated = options.filter((option) => option !== selectedOption);
    setOptions(updated);
    setValue(updated[0]);
  };

  return {
    value,
    options,
    selectOptions,
    handleChange,
  };
};

export default useFilterInput;
