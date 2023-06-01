import React, { useContext } from 'react';
import PlanetsContext from '../context/planetsContext';

function Tabela() {
  const { planets, headers } = useContext(PlanetsContext);

  const renderHeaders = () => (
    headers.map((header) => (
      <th key={ header }>{header}</th>
    ))
  );

  const renderRows = () => (
    planets.map((planet) => (
      <tr key={ planet.name }>
        {Object.values(planet).map((item, index) => (
          <td key={ index }>{item}</td>
        ))}
      </tr>
    ))
  );

  return (
    <table>
      <thead>
        <tr>{renderHeaders()}</tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
}

export default Tabela;
