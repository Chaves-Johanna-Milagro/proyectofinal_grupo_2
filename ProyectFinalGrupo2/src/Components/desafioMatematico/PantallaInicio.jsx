import React from 'react';

function PantallaInicio({ iniciarJuego }) {
    return (
        <div>
            <h1>Desafío Matemático</h1>
            <p>Seleccione el nivel de dificultad:</p>
            <button onClick={() => iniciarJuego('basico')}>Básico</button>
            <button onClick={() => iniciarJuego('intermedio')}>Intermedio</button>
            <button onClick={() => iniciarJuego('avanzado')}>Avanzado</button>
        </div>
    );
}

export default PantallaInicio;
