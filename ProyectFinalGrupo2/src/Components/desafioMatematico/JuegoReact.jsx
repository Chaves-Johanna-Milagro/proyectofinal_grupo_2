
import React, { useState } from 'react';
import PantallaInicio from './PantallaInicio';
import PantallaDesafio from './PantallaDesafio';
import PantallaLogro from './PantallaLogro';
import PantallaDerrota from './PantallaDerrota';

function JuegoReact() {
    const [pantalla, setPantalla] = useState('inicio');
    const [nivel, setNivel] = useState(null);

    const iniciarJuego = (nivelSeleccionado) => {
        setNivel(nivelSeleccionado);
        setPantalla('desafio');
    };

    const mostrarPantallaLogro = () => setPantalla('logro');
    const mostrarPantallaDerrota = () => setPantalla('derrota');

    return (
        <div>
            {pantalla === 'inicio' && <PantallaInicio iniciarJuego={iniciarJuego} />}
            {pantalla === 'desafio' && (
                <PantallaDesafio
                    nivel={nivel}
                    mostrarPantallaLogro={mostrarPantallaLogro}
                    mostrarPantallaDerrota={mostrarPantallaDerrota}
                />
            )}
            {pantalla === 'logro' && <PantallaLogro />}
            {pantalla === 'derrota' && <PantallaDerrota />}
        </div>
    );
}

export default JuegoReact;
