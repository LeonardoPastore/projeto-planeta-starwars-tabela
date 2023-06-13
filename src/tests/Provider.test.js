import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterProvider from '../context/filterProvider';
import App from '../App'
import Table from '../components/Tabela';
import mockData from './mock/mockData';
import PlanetsProvider from '../context/planetsProvider';
import contextPlanet from '../context/planetsContext';
import FilterContext from '../context/filterContext';

describe('FilterProvider', () => {
  it('renders children correctly', () => {
    render(
      <FilterProvider>
        <div>Test children</div>
      </FilterProvider>
    );

    const childrenElement = screen.getByText('Test children');
    expect(childrenElement).toBeInTheDocument();
  });

  describe('Testes para o componente Table', () => {
    beforeEach(() => {
      jest.spyOn(global, 'fetch');
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
  
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    });

  describe('Testes para o componente Table', () => {
    const mockData = {
      results: [
        { name: 'Planet 1', population: 100000 },
        { name: 'Planet 2', population: 200000 },
        { name: 'Planet 3', population: 300000 },
      ],
    };
  
    beforeEach(() => {
      jest.spyOn(React, 'useContext').mockReturnValueOnce({
        planets: mockData.results,
        keys: Object.keys(mockData.results[0]),
      }).mockReturnValueOnce({
        filterName: { value: '' },
        click: { value: [] },
      });
  
      render(
        <contextPlanet.Provider>
          <FilterContext.Provider>
            <Table />
          </FilterContext.Provider>
        </contextPlanet.Provider>
      );
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('Verifica se o cabeçalho da tabela e os planetas são renderizados corretamente', () => {
      const headersAPI = Object.keys(mockData.results[0]);
      const headers = screen.getAllByRole('columnheader');
      headers.forEach((header, index) => {
        expect(header).toHaveTextContent(headersAPI[index]);
      });
    });
});
  });
})