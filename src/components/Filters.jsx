import React, { useContext } from 'react';
import FilterContext from '../context/filterContext';

function Filter() {
  const {
    filterName, columnFilter: columnFilterAll, comparisonFilter:
    comparison, valueFilter, click,
  } = useContext(FilterContext);

  const handleAddFilter = () => {
    click.handleClickAdd([columnFilterAll.value,
      comparison.value, valueFilter.value]);
    columnFilterAll.selectOptions(columnFilterAll.value);
  };

  const handleDeleteFilter = (element) => {
    click.handleClickRemove(click.value[element]);
  };

  const handleRemoveAllFilters = () => {
    click.handleClickRemoveAll();
  };

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Name"
          id="name-filter"
          value={ filterName.value }
          onChange={ filterName.handleChange }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          onChange={ columnFilterAll.handleChange }
          disabled={ !columnFilterAll.value }
        >
          {columnFilterAll.options.map((element) => (
            <option key={ element } value={ element }>
              {element}
            </option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          onChange={ comparison.handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          placeholder="Número"
          type="number"
          value={ valueFilter.value }
          onChange={ valueFilter.handleChange }
        />

        <button data-testid="button-filter" type="button" onClick={ handleAddFilter }>
          Adicionar
        </button>

        <div>
          {click.value.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <p>{`${filter[0]} ${filter[1]} ${filter[2]}`}</p>
              <button type="button" onClick={ () => handleDeleteFilter(index) }>
                Excluir Filtro
              </button>
            </div>
          ))}
        </div>

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

export default Filter;
