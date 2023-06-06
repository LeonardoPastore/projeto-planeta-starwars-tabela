import PropTypes from 'prop-types';
import FilterContext from './filterContext';
import useFilter from '../hoocks/useFilter';
import useClick from '../hoocks/useClick';

function FilterProvider({ children }) {
  const filterName = useFilter('');
  const column = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const click = useClick([]);

  const defaultFilter = {
    columnFilter: useFilter('population'),
    comparisonFilter: useFilter('maior que'),
    valueFilter: useFilter(0),
  };

  const value = { filterName, column, click, ...defaultFilter };

  return (
    <FilterContext.Provider value={ value }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default FilterProvider;
