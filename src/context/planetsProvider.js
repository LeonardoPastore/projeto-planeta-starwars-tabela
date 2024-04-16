import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchAPI';
import planetsContext from './planetsContext';

function PlanetsProvider({ children }) {
  const [planetData, setPlanetData] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    column: 'population',
    condition: 'maior que',
    value: 0,
  });
  const initialColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    const fetchData = async () => {
      const planetsArray = await fetchApi();
      setPlanetData(planetsArray);
    };

    fetchData();
  }, []);
  const handleOrder = (order) => {
    const { column, sort } = order;
    const sortedData = [...planetData];
    const one = 1;
    const minusOne = -1;

    sortedData.sort((a, b) => {
      if (a[column] === 'unknown' && b[column] === 'unknown') {
        return 0;
      } if (a[column] === 'unknown') {
        return one;
      } if (b[column] === 'unknown') {
        return minusOne;
      } if (sort === 'ASC') {
        return a[column] - b[column];
      }
      return b[column] - a[column];
    });

    setPlanetData(sortedData);
  };

  const value = {
    planetData,
    textFilter,
    setTextFilter,
    selectedFilter,
    setSelectedFilter,
    activeFilters,
    setActiveFilters,
    columns,
    setColumns,
    handleOrder,
    initialColumns,
  };

  return (
    <planetsContext.Provider value={ value }>
      {' '}

      {children}
      {' '}

    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
