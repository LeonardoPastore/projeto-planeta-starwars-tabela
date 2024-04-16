import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

function Table() {
  const {
    planetData,
    textFilter,
    activeFilters,
  } = useContext(planetsContext);

  const dataProcessing = (planeta) => {
    const condicoes = [];

    activeFilters.forEach((condicao) => {
      switch (condicao.condition) {
      case 'maior que':
        condicoes.push(Number(planeta[condicao.column]) > Number(condicao.value));
        break;
      case 'menor que':
        condicoes.push(Number(planeta[condicao.column]) < Number(condicao.value));
        break;
      case 'igual a':
        condicoes.push(Number(planeta[condicao.column]) === Number(condicao.value));
        break;
      default:
        return true;
      }
    });

    return condicoes.every((condicao) => condicao);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetData
            .filter((mund) => mund.name.toLowerCase().includes(textFilter.toLowerCase()))
            .filter(dataProcessing)
            .map((planet, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
