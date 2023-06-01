import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './planetsContext';
import fetchApi from '../services/fetchAPI';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataApi = await fetchApi('https://swapi.dev/api/planets');
        const [firstPlanet] = dataApi;
        setPlanets(dataApi);
        setHeaders(Object.keys(firstPlanet));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets, headers } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
