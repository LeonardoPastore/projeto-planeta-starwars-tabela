import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import PlanetsProvider from "../context/planetsProvider";
import mockData from "./mock/mockData";

describe("Table component", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it("renders the table with the correct data", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("planet-name")).toBeInTheDocument();
      });
    
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Alderaan")).toBeInTheDocument();
      expect(screen.getByText("Yavin IV")).toBeInTheDocument();
    
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Rotation Period")).toBeInTheDocument();
      expect(screen.getByText("Orbital Period")).toBeInTheDocument();
    });

    it("filters the table based on user input", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("planet-name")).toBeInTheDocument();
      });
    
      const searchInput = screen.getByPlaceholderText("Search...");
      userEvent.type(searchInput, "Tatooine");
    
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.queryByText("Alderaan")).not.toBeInTheDocument();
      expect(screen.queryByText("Yavin IV")).not.toBeInTheDocument();
    
      userEvent.clear(searchInput);
    
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Alderaan")).toBeInTheDocument();
      expect(screen.getByText("Yavin IV")).toBeInTheDocument();
    });
    it("applies filter conditions correctly to the table data", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("planet-name")).toBeInTheDocument();
      });
    
      const filterCondition = { column: "diameter", condition: "maior que", value: 10000 };

      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.queryByText("Alderaan")).not.toBeInTheDocument();
      expect(screen.getByText("Bespin")).toBeInTheDocument();

    });
    
});



describe('Filters', () => {
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
  
    afterEach(() => {
      global.fetch.mockRestore();
    });

    it('Verifica se alterar todos os filtros, é respeitado', async () => {
      render(<App />);
  
      await waitFor(async () => {
        const comparisonFilter = await screen.findByTestId('comparison-filter');
        const valueFilter = await screen.findByTestId('value-filter');
        const btnFilter = await screen.findByTestId('button-filter');
        fireEvent.change(valueFilter, {target: { value: 200000 }});
        fireEvent.change(comparisonFilter, {target: { value: 'menor que' }});
        expect(valueFilter).toHaveValue(200000);
        expect(comparisonFilter).toHaveValue('menor que');
        userEvent.click(btnFilter);
  
        const planetName = await screen.findByText('Yavin IV');
        expect(planetName).toBeInTheDocument();
  
  
      }, {timeout: 5000})
    })

    it('Verifica se ao realizar algum fitro é respeitado', async () => {
      render(<App />);
  
      await waitFor(async () => {
        const valueFilter = await screen.findByTestId('value-filter');
        const btnFilter = await screen.findByTestId('button-filter');
        fireEvent.change(valueFilter, {target: { value: 200000 }});
        expect(valueFilter).toHaveValue(200000);
  
        userEvent.click(btnFilter);
        const planetName = await screen.findByText('Alderaan');
        expect(planetName).toBeInTheDocument();
      }, {timeout: 5000})
    })

    test('should update text filter value when input changes', () => {
        
        const input = getByTestId('name-filter');
        fireEvent.change(input, { target: { value: 'Tatooine' } });
        expect(input.value).toBe('Tatooine');
      });
    
      test('should update selected filter column when select changes', () => {
        
        const select = getByTestId('column-filter');
        fireEvent.change(select, { target: { value: 'name' } });
        expect(select.value).toBe('name');
      });
    
      test('should add active filter when "Adicionar Filtro" button is clicked', () => {
       
        const addButton = getByTestId('button-filter');
        fireEvent.click(addButton);
    
        const filterElement = getAllByTestId('filter')[0];
        expect(filterElement.textContent).toBe('column  maior que  '); 
      });
    
      test('should remove active filter when delete button is clicked', () => {
      ;
        const addButton = getByTestId('button-filter');
        fireEvent.click(addButton);
    
        const deleteButton = getByTestId('delete-filter-button');
        fireEvent.click(deleteButton);
    
        expect(queryByTestId('filter')).toBeNull();
      });
    
      test('should remove all active filters when "Remover todas filtragens" button is clicked', () => {
        
        const addButton = getByTestId('button-filter');
        fireEvent.click(addButton);
    
        const removeAllButton = getByTestId('button-remove-filters');
        fireEvent.click(removeAllButton);
    
        expect(queryByTestId('filter')).toBeNull();
      });

      it("should sort planets correctly", async () => {
        const columnSort = screen.getByTestId("column-sort");
        const ascRadio = screen.getByTestId("column-sort-input-asc");
        const descRadio = screen.getByTestId("column-sort-input-desc");
        const sortButton = screen.getByTestId("column-sort-button");
    
     
        userEvent.selectOptions(columnSort, "diameter");
        userEvent.click(ascRadio);
        userEvent.click(sortButton);
    
        await waitFor(() => {
          expect(columnSort).toHaveValue("diameter");
          expect(ascRadio).toBeChecked();
          expect(descRadio).not.toBeChecked();
          const firstPlanetName = screen.getAllByTestId("planet-name")[0];
          expect(firstPlanetName).toHaveTextContent("Endor");
        });
    
        userEvent.selectOptions(columnSort, "diameter");
        userEvent.click(descRadio);
        userEvent.click(sortButton);
    
        await waitFor(() => {
          expect(columnSort).toHaveValue("diameter");
          expect(descRadio).toBeChecked();
          expect(ascRadio).not.toBeChecked();
          const firstPlanetName = screen.getAllByTestId("planet-name")[0];
          expect(firstPlanetName).toHaveTextContent("Bespin");
        });
    
       
        userEvent.selectOptions(columnSort, "population");
        userEvent.click(descRadio);
        userEvent.click(sortButton);
    
        await waitFor(() => {
          expect(columnSort).toHaveValue("population");
          expect(ascRadio).not.toBeChecked();
          expect(descRadio).toBeChecked();
          const firstPlanetName = screen.getAllByTestId("planet-name")[0];
          expect(firstPlanetName).toHaveTextContent("Coruscant");
        });
    
        userEvent.selectOptions(columnSort, "population");
        userEvent.click(ascRadio);
        userEvent.click(sortButton);
    
        await waitFor(() => {
          expect(columnSort).toHaveValue("population");
          expect(ascRadio).toBeChecked();
          expect(descRadio).not.toBeChecked();
          const firstPlanetName = screen.getAllByTestId("planet-name")[0];
          expect(firstPlanetName).toHaveTextContent("Yavin IV");
        });
    
       
        userEvent.selectOptions(columnSort, "orbital_period");
        userEvent.click(descRadio);
        userEvent.click(sortButton);
    
        await waitFor(() => {
          expect(columnSort).toHaveValue("orbital_period");
          expect(ascRadio).not.toBeChecked();
          expect(descRadio).toBeChecked();
          const firstPlanetName = screen.getAllByTestId("planet-name")[0];
          expect(firstPlanetName).toHaveTextContent("Bespin");
        });
    
        userEvent.selectOptions(columnSort, "orbital_period");
        userEvent.click(ascRadio);
        userEvent.click(sortButton);
    
        await waitFor(() => {
          expect(columnSort).toHaveValue("orbital_period");
          expect(ascRadio).toBeChecked();
          expect(descRadio).not.toBeChecked();
          const firstPlanetName = screen.getAllByTestId("planet-name")[0];
          expect(firstPlanetName).toHaveTextContent("Tatooine");
        });
    
     
        userEvent.selectOptions(columnSort, "rotation_period");
        userEvent.click(descRadio);
        userEvent.click(sortButton);
    
        await waitFor(() => {
          expect(columnSort).toHaveValue("rotation_period");
          expect(ascRadio).not.toBeChecked();
          expect(descRadio).toBeChecked();
          const firstPlanetName = screen.getAllByTestId("planet-name")[0];
          expect(firstPlanetName).toHaveTextContent("Kamino");
        });
    
        userEvent.selectOptions(columnSort, "rotation_period");
        userEvent.click(ascRadio);
        userEvent.click(sortButton);
    
        await waitFor(() => {
          expect(columnSort).toHaveValue("rotation_period");
          expect(ascRadio).toBeChecked();
          expect(descRadio).not.toBeChecked();
          const firstPlanetName = screen.getAllByTestId("planet-name")[0];
          expect(firstPlanetName).toHaveTextContent("Bespin");
        });
      })
})