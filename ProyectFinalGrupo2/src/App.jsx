import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Components/Layout';
import Home from './Components/Home';
import AboutUs from './Components/AboutUs';
import JuegoPhaser from './Components/JuegoPhaser';
import IMCCalcular from './Components/IMCCalcular';

function App() {


  return (
    <Routes>
      <Route path='/' element={ <Layout /> } >
        <Route index element={ <Home /> } />
        <Route path='aboutUs' element={ <AboutUs/> } />
        <Route path='juegoPhaser' element={ <JuegoPhaser/> } />
        <Route path='IMCCalcular' element={<IMCCalcular />} />
      </Route>
    </Routes>
  );
};

export default App;
