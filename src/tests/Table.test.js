import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../components/Tabela';
import contextPlanet from '../context/planetsContext';
import FilterContext from '../context/filterContext';

describe('Table', () => {
  it('renders table with filtered planets when clickButton.value.length > 0', () => {
    const mockPlanets = [
      { name: 'Mars', climate: 'Arid', population: '1000' },
      { name: 'Venus', climate: 'Hot', population: '500' },
    ];

    const mockContextValues = {
      planets: mockPlanets,
      keys: ['name', 'climate', 'population'],
    };

    const mockFilterContextValues = {
      filterName: { value: 'mars' },
      click: { value: [['climate', 'maior que', '30']] },
    };

    render(
      <contextPlanet.Provider value={mockContextValues}>
        <FilterContext.Provider value={mockFilterContextValues}>
          <Table />
        </FilterContext.Provider>
      </contextPlanet.Provider>
    );

    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.getByText('Venus')).toBeInTheDocument();
  });

  it('renders table without filtered planets when clickButton.value.length is 0', () => {
    const mockPlanets = [
      { name: 'Mars', climate: 'Arid', population: '1000' },
      { name: 'Venus', climate: 'Hot', population: '500' },
    ];
  
    const mockContextValues = {
      planets: mockPlanets,
      keys: ['name', 'climate', 'population'],
    };
  
    const mockFilterContextValues = {
      filterName: { value: '' },
      click: { value: [] },
    };
  
    render(
      <contextPlanet.Provider value={mockContextValues}>
        <FilterContext.Provider value={mockFilterContextValues}>
          <Table />
        </FilterContext.Provider>
      </contextPlanet.Provider>
    );
  
    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.getByText('Venus')).toBeInTheDocument();
  });
  
});