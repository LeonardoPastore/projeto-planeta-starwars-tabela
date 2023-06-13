import React from 'react';
import { render } from '@testing-library/react';
import Table from '../components/Tabela';
import contextPlanet from '../context/planetsContext';
import FilterContext from '../context/filterContext';

describe('Table', () => {
  test('renders table with correct data and different comparison operator', () => {
    const contextPlanetData = {
      planets: [
        { name: 'Planet 1', population: 1000 },
        { name: 'Planet 2', population: 2000 },
        { name: 'Planet 3', population: 3000 },
      ],
      keys: ['name', 'population'],
      //
    };

    const filterContextData = {
      filterName: { value: 'planet' },
      click: {
        value: [
          ['population', 'diferente de', 2000],
        ],
      },
    };

    const { getByText, queryByText } = render(
      <contextPlanet.Provider value={contextPlanetData}>
        <FilterContext.Provider value={filterContextData}>
          <Table />
        </FilterContext.Provider>
      </contextPlanet.Provider>
    );

    expect(getByText('Planet 1')).toBeInTheDocument();
    expect(queryByText('Planet 2')).toBeNull(); // Planet 2 should not be rendered
    expect(getByText('Planet 3')).toBeInTheDocument();
    expect(getByText('1000')).toBeInTheDocument();
    expect(getByText('3000')).toBeInTheDocument();
  });
});