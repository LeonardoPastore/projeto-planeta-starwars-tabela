import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from '../components/Filters';
import FilterContext from '../context/filterContext';
import mockData from './mock/mockData';
import App from '../App';
test('I am your test', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading');
  expect(headingElement).toHaveTextContent('Hello, App!');
});



const mockContextValue = {
  filterName: {
    value: '',
    handleChange: jest.fn(),
  },
  columnFilter: {
    value: '',
    handleChange: jest.fn(),
    options: ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    selectOptions: jest.fn(),
  },
  comparisonFilter: {
    value: '',
    handleChange: jest.fn(),
  },
  valueFilter: {
    value: '',
    handleChange: jest.fn(),
  },
  click: {
    value: [],
    handleClickAdd: jest.fn(),
    handleClickRemove: jest.fn(),
    handleClickRemoveAll: jest.fn(),
  },
};

describe('Filter', () => {
  test('renders the filter component', () => {
    render(
      <FilterContext.Provider value={mockContextValue}>
        <Filter />
      </FilterContext.Provider>
    );

    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
  });

  test('adds a filter', () => {
    render(
      <FilterContext.Provider value={mockContextValue}>
        <Filter />
      </FilterContext.Provider>
    );

    userEvent.type(screen.getByTestId('name-filter'), 'Example Name');
    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.type(screen.getByTestId('value-filter'), '100');

    userEvent.click(screen.getByTestId('button-filter'));

    expect(mockContextValue.click.handleClickAdd).toHaveBeenCalledWith(['population', 'maior que', '100']);
  });

  test('deletes a filter', () => {
    render(
      <FilterContext.Provider value={mockContextValue}>
        <Filter />
      </FilterContext.Provider>
    );

    act(() => {
      mockContextValue.click.value = [['population', 'maior que', '100']];
    });

    userEvent.click(screen.getByText('Excluir Filtro'));

    expect(mockContextValue.click.handleClickRemove).toHaveBeenCalledWith(0);
  });

  test('removes all filters', () => {
    render(
      <FilterContext.Provider value={mockContextValue}>
        <Filter />
      </FilterContext.Provider>
    );

    act(() => {
      mockContextValue.click.value = [['population', 'maior que', '100'], ['diameter', 'igual a', '200']];
    });

    userEvent.click(screen.getByTestId('button-remove-filters'));

    expect(mockContextValue.click.handleClickRemoveAll).toHaveBeenCalled();
  });
  
});
