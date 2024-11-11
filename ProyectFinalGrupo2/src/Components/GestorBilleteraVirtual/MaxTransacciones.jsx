import React from 'react';

function MaxTransacciones({ maxTransacciones }) {
  return (
    <div className='text-white'>
      <h3>Billetera con Mayor Cantidad de Transacciones</h3>
      <ul>
        {maxTransacciones.map((usuario, index) => (
          <li key={index}>
            {usuario.nombre} - {usuario.billetera} - {usuario.numTransac}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MaxTransacciones;
