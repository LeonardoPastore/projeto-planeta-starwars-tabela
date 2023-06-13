import React, { useContext, useEffect } from 'react';
import planetsContext from '../context/planetsContext';

function Filters() {
  const {
    setTextFilter,
    textFilter,
    selectedFilter,
    setSelectedFilter,
    activeFilters,
    setActiveFilters,
    columns,
    setColumns,
    initialColumns,
  } = useContext(planetsContext);

  const handleChange = (e) => {
    setTextFilter(e.target.value);
  };

  const handleClickFilterBtn = () => {
    setActiveFilters([...activeFilters, selectedFilter]);
    const newColumns = columns.filter((col) => col !== selectedFilter.column);
    setColumns(newColumns);
    setSelectedFilter({
      column: '',
      condition: '',
      value: '',
    });
  };

  const handleDeleteFilter = (column) => {
    const updatedFilters = activeFilters.filter((filter) => filter.column !== column);
    const updatedColumns = [...columns, column];
    setActiveFilters(updatedFilters);
    setColumns(updatedColumns);
  };

  const handleRemoveAllFilters = () => {
    setActiveFilters([]);
    setColumns(initialColumns);
  };

  useEffect(() => {
    setSelectedFilter({ column: columns[0] || '', condition: 'maior que', value: 0 });
  }, [columns, setSelectedFilter]);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="textInput"
        value={ textFilter }
        onChange={ handleChange }
        placeholder="Pesquisa por nome"
      />

      <div>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ (e) => {
            setSelectedFilter({ ...selectedFilter, column: e.target.value });
          } }
        >
          {columns.map((column) => (
            <option value={ column } key={ column }>
              {column}
            </option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (e) => {
            setSelectedFilter({ ...selectedFilter, condition: e.target.value });
          } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ (e) => {
            setSelectedFilter({ ...selectedFilter, value: e.target.value });
          } }
          value={ selectedFilter.value }
        />

        {activeFilters.map((filter) => (
          <div key={ filter.column } data-testid="filter">
            {`${filter.column} ${filter.condition} ${filter.value}`}
            {' '}

            {' '}
            <button onClick={ () => handleDeleteFilter(filter.column) }>Delete</button>
            {' '}

          </div>
        ))}

        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleClickFilterBtn }
        >
          Adicionar Filtro
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleRemoveAllFilters }
        >
          Remover todas filtragens
        </button>

      </div>
    </div>
  );
}

export default Filters;
