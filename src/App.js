import React from 'react';
import './App.css';
import Table from './components/Tabela';
import ProviderPlanet from './context/planetsProvider';
import Filter from './components/Filters';
import FiltersProvider from './context/filterProvider';

function App() {
  return (
    <div>
      <ProviderPlanet>
        <FiltersProvider>
          <Table />
          <Filter />
        </FiltersProvider>
      </ProviderPlanet>
    </div>
  );
}

export default App;
