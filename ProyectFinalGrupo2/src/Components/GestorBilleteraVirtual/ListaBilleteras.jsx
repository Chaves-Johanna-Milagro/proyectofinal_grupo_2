import React from 'react';

function ListaBilleteras({ regBilletera }) {
  return (
    <div>
      <h2>Lista de Billeteras Registradas</h2>
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
