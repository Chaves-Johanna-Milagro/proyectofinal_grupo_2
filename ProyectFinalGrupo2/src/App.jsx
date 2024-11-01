import React from 'react';
import { Routes, Route } from 'react-router-dom';

//import './App.css'
import Layout from './Components/Layout';
import Home from './Components/Home';
import JuegoPhaser from './Components/JuegoPhaser';

function App() {


  return (
    <Routes>
      <Route path='/' element={ <Layout /> } >
        <Route index element={ <h1>pag Principal</h1>} />
        <Route path='home' element={ <Home /> } />
      </Route>
    </Routes>
  );
};

export default App;
