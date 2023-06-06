import { useContext } from 'react';
import contextPlanet from '../context/planetsContext';
import FilterContext from '../context/filterContext';

function Table() {
  const { planets, keys } = useContext(contextPlanet);
  const { filterName, click: clickButton } = useContext(FilterContext);

  const filtered = planets.filter((element) => {
    const nameFilter = filterName.value.toLowerCase();
    const nameIncludesFilter = element.name.toLowerCase().includes(nameFilter);

    if (clickButton.value.length === 0) {
      return nameIncludesFilter;
    }

    return clickButton.value.every(([key, operator, comparison]) => {
      if (operator === 'maior que') {
        return element[key] > +comparison;
      } if (operator === 'menor que') {
        return element[key] < +comparison;
      } if (operator === 'igual a') {
        return element[key] === comparison;
      }
      return false;
    }) && nameIncludesFilter;
  }).map((planet) => (
    <tr key={ planet.name }>
      {Object.values(planet).map((element, index) => (
        <td key={ `${element}${index}` }>{element}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          {keys.map((element) => (
            <th key={ element }>{element}</th>
          ))}
        </tr>
      </thead>
      <tbody>{filtered}</tbody>
    </table>
  );
}

export default Table;
