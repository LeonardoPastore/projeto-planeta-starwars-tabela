import React from 'react';
import './App.css';
import Table from './components/Tabela';
import ProviderPlanet from './context/planetsProvider';
import Filter from './components/Filters';
import FiltersProvider from './context/filterProvider';
import Order from './components/Order';

function App() {
  return (
    <div>
      <ProviderPlanet>
        <FiltersProvider>
          <Filter />
          <Order />
          <Table />
        </FiltersProvider>
      </ProviderPlanet>
    </div>
  );
}

export default App;
