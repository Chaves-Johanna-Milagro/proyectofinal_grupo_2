import React, { useState, useEffect } from 'react';

function PantallaDesafio({ nivel, mostrarPantallaLogro, mostrarPantallaDerrota }) {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operador, setOperador] = useState('+');
    const [respuesta, setRespuesta] = useState('');
    const [resultado, setResultado] = useState('');
    const [puntaje, setPuntaje] = useState(0);
    const [ejercicios, setEjercicios] = useState(5);

    useEffect(() => {
        generarProblema();
    }, []);

    const generarProblema = () => {
        let newNum1, newNum2, newOperador;

        switch (nivel) {
            case 'basico':
                newNum1 = Math.floor(Math.random() * 10) + 1;
                newNum2 = Math.floor(Math.random() * 10) + 1;
                newOperador = Math.random() < 0.5 ? '+' : '-';
                break;
            case 'intermedio':
                newNum1 = Math.floor(Math.random() * 12) + 1;
                newNum2 = Math.floor(Math.random() * 12) + 1;
                newOperador = Math.random() < 0.5 ? '×' : '÷';
                break;
            case 'avanzado':
                newNum1 = (Math.random() * 10).toFixed(1);
                newNum2 = (Math.random() * 10).toFixed(1);
                newOperador = '×';
                break;
            default:
                break;
        }

        setNum1(parseFloat(newNum1));
        setNum2(parseFloat(newNum2));
        setOperador(newOperador);
        setRespuesta('');
        setResultado('');
    };

    const verificarRespuesta = () => {
        const correctAnswer =
            operador === '+'
                ? num1 + num2
                : operador === '-'
                ? num1 - num2
                : operador === '×'
                ? num1 * num2
                : num1 / num2;

        if (parseFloat(respuesta) === correctAnswer) {
            setResultado('¡Correcto!');
            setPuntaje(puntaje + 1);
        } else {
            setResultado('Incorrecto');
        }

        const ejerciciosRestantes = ejercicios - 1;
        setEjercicios(ejerciciosRestantes);

        if (ejerciciosRestantes <= 0) {
            puntaje >= 3 ? mostrarPantallaLogro() : mostrarPantallaDerrota();
        } else {
            generarProblema();
        }
    };

    return (
        <div>
            <h2>Resuelve el problema:</h2>
            <h3>{num1} {operador} {num2}</h3>
            <input
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                placeholder="Escriba el resultado"
            />
            <button onClick={verificarRespuesta}>Verificar</button>
            <h3>{resultado}</h3>
            <h3>Puntaje: {puntaje}</h3>
            <h3>Ejercicios restantes: {ejercicios}</h3>
        </div>
    );
}

export default PantallaDesafio;