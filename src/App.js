import React from 'react';
import PlanetsProvider from './context/planetsProvider';
import Tabela from './components/Tabela';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <Tabela />
      </div>
    </PlanetsProvider>
  );
}

export default App;
