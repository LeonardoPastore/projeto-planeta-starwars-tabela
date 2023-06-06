import PropTypes from 'prop-types';
import { useEffect } from 'react';
import contextPlanet from './planetsContext';
import useFetch from '../services/fetchAPI';

function PlanetsProvider({ children }) {
  const api = 'https://swapi.dev/api/planets';
  const { planets, fetchApi } = useFetch(api);

  let initialKeys = [];

  useEffect(() => {
    const apiUpdate = () => {
      fetchApi(api);
    };
    apiUpdate();
  }, [fetchApi]);

  if (planets.length) {
    initialKeys = Object.keys(planets[0]);
  }

  return (
    <contextPlanet.Provider value={ { planets, keys: initialKeys } }>
      {children}
    </contextPlanet.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.elementType.isRequired,
};
