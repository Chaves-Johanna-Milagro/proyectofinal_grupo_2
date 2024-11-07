import React from 'react';

function MaxTransacciones({ maxTransacciones }) {
  return (
    <div>
      <h2>Billetera con Mayor Cantidad de Transacciones</h2>
      <ul>
        {maxTransacciones.map((usuario, index) => (
          <li key={index}>
            {usuario.usuario} - {usuario.billetera} - {usuario.numTransac}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MaxTransacciones;
