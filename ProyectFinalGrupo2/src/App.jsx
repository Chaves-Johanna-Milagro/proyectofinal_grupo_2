import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Components/Layout';
import Home from './Components/Home';
import JuegoPhaser from './Components/JuegoPhaser';

function App() {


  return (
    <Routes>
      <Route path='/' element={ <Layout /> } >
        <Route index element={ <Home /> } />
        <Route path='juegoPhaser' element={ <JuegoPhaser/> } />
      </Route>
    </Routes>
  );
};

export default App;
