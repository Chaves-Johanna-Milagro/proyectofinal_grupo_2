import React from 'react';

function ListaBilleteras({ regBilletera }) {
  return (
    <div className='text-white'>
      <h3>Lista de Billeteras Registradas</h3>
      <ul>
        {regBilletera.map((billetera, index) => (
          <li key={index}>
            {billetera.nombre} - {billetera.billetera} - {billetera.numTransac}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaBilleteras;
