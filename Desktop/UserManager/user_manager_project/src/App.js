import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './routes/public/PublicRoutes';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PublicRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;

