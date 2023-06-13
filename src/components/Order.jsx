import React, { useContext, useState } from 'react';
import contextPlanet from '../context/planetsContext';

export default function Order() {
  const { handleOrder } = useContext(contextPlanet);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const handleChange = (e) => {
    setOrder({ ...order, column: e.target.value });
  };

  const handleSort = () => {
    handleOrder(order);
  };

  return (
    <div>
      <select
        data-testid="column-sort"
        value={ order.column }
        onChange={ handleChange }
      >
        <option value="population">Population</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation Period</option>
        <option value="surface_water">Surface Water</option>
      </select>
      <label>
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          checked={ order.sort === 'ASC' }
          onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
        />
        Ascending
      </label>
      <label>
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          checked={ order.sort === 'DESC' }
          onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
        />
        Descending
      </label>
      <button
        data-testid="column-sort-button"
        onClick={ handleSort }
      >
        Sort
      </button>
    </div>
  );
}
