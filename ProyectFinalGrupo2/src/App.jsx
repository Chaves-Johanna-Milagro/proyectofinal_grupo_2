import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './Components/Layout';
import Home from './Components/Home';
import AboutUs from './Components/AboutUs';
import CalculadoraIMC from './Components/CalculadoraIMC';
import GestorBilleteraVirtual from './Components/GestorBilleteraVirtual';
import JuegoPhaser from './Components/JuegoPhaser';
import IMCCalcular from './Components/IMCCalcular';
import JuegoReact from './Components/desafioMatematico/JuegoReact';
import ErrorPage from './Components/ErrorPage';


function App() {


  return (
    <Routes>
      <Route path='/' element={ <Layout /> } >
        <Route index element={ <Home /> } />
        <Route path='aboutUs' element={ <AboutUs/> } />
        <Route path='calculadoraIMC' element={ <CalculadoraIMC/> } />
        <Route path='gestorBilleteraVirtual' element={ <GestorBilleteraVirtual/> } />
        <Route path='juegoPhaser' element={ <JuegoPhaser/> } />
        <Route path='IMCCalcular' element={<IMCCalcular />} />
        <Route path='juegoReact' element={ <JuegoReact/> } />
        <Route path='*' element={ <ErrorPage/> } />    
      </Route>
    </Routes>
  );
};

export default App;
