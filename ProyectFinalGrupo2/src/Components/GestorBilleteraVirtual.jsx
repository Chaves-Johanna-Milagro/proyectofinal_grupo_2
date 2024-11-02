import React from "react";
import { useState } from "react";

//namas de ejemplo por ahora, quedaria pendiente la funcionalidad
function GestorBilleteraVirtual(){

    const [nombre,setNombre] = useState("");
    const [billetera,setBillletera] = useState("");
    const [numTransac,setNumTransac] = useState(0);

    return (
        <>
        <h1>Gestor de Transacciones en Billeteras Virtuales</h1>
        <div>
            <div>
                <label>Nombre de usuario</label>
                <input 
                type="text"
                value={nombre}
                onChange={(e)=> setNombre(e.target.value)}>
                </input>
            </div>

            <div>
                <label>Billetera virtual</label>
                <input 
                type="text"
                value={billetera}
                onChange={(e)=> setBillletera(e.target.value)}>
                </input>
            </div>

            <div>
                <label>Numero de transacciones realizadas</label>
                <input 
                type="number"
                value={numTransac}
                onChange={(e)=> setNumTransac(e.target.value)}>
                </input>
            </div>
                        
            <button>Registrar</button> 

            <button>Mostrar Datos</button> 

            <button>Mayor Cantidad Transacciones</button>
        </div>
        </>
    );
}
export default GestorBilleteraVirtual;