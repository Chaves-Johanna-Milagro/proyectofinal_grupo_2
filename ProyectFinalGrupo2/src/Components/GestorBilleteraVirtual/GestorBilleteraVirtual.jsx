import React, { useState } from "react";
import ListaBilleteras from "./ListaBilleteras"; // Importa el componente para mostrar billeteras
import MaxTransacciones from "./MaxTransacciones"; // Importa el componente para mostrar las transacciones máximas

function GestorBilleteraVirtual() {
  const [regBilletera, setRegBilletera] = useState([]);
  const [nombre, setNombre] = useState("");
  const [billetera, setBilletera] = useState("");
  const [numTransac, setNumTransac] = useState(0);

  // Estados para controlar la visibilidad de las listas
  const [mostrarBilleteras, setMostrarBilleteras] = useState(false);
  const [mostrarMaxTransac, setMostrarMaxTransac] = useState(false);

  // Función para registrar o actualizar las billeteras
  const registrar = () => {
    if (nombre && billetera && !isNaN(numTransac) && numTransac >= 0) {
      const regExistente = regBilletera.findIndex(
        (reg) => reg.nombre === nombre && reg.billetera === billetera
      );

      if (regExistente !== -1) {
        const actualizarBill = [...regBilletera];
        actualizarBill[regExistente].numTransac += parseInt(numTransac, 10);
        setRegBilletera(actualizarBill);
      } else {
        const newBilletera = { nombre, billetera, numTransac: parseInt(numTransac, 10) };
        setRegBilletera([...regBilletera, newBilletera]);
      }

      setNombre('');
      setBilletera('');
      setNumTransac(0);
    } else {
      alert("Por favor, completa todos los campos correctamente");
    }
  };

  // Función para obtener el registro con la mayor cantidad de transacciones de cada usuario
  const getMaxTransac = () => {
    const usuarioTransac = regBilletera.reduce((reg, billetera) => {
      if (!reg[billetera.nombre]) {
        reg[billetera.nombre] = [];
      }
      reg[billetera.nombre].push(billetera);
      return reg;
    }, {});

    const usuarioMaxTransac = Object.entries(usuarioTransac).map(([usuario, billeteras]) => {
      const maxTransac = billeteras.reduce((max, cont) =>
        cont.numTransac > max.numTransac ? cont : max
      );
      return { usuario, ...maxTransac };
    });
    return usuarioMaxTransac;
  };

  return (
    <>
      <h1>Gestor de Transacciones en Billeteras Virtuales</h1>
      <div>
        <div>
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div>
          <label>Billetera virtual</label>
          <input
            type="text"
            value={billetera}
            onChange={(e) => setBilletera(e.target.value)} />
        </div>

        <div>
          <label>Numero de transacciones realizadas</label>
          <input
            type="number"
            value={numTransac}
            onChange={(e) => setNumTransac(Number(e.target.value))} />
        </div>

        <button onClick={registrar}>Registrar</button>
      </div>

      {/* Botones para mostrar las listas */}
      <div>
        <button onClick={() => setMostrarBilleteras(!mostrarBilleteras)}>
          {mostrarBilleteras ? "Ocultar Billeteras Registradas" : "Mostrar Billeteras Registradas"}
        </button>

        <button onClick={() => setMostrarMaxTransac(!mostrarMaxTransac)}>
          {mostrarMaxTransac ? "Ocultar Mayor Cantidad de Transacciones" : "Mostrar Mayor Cantidad de Transacciones"}
        </button>
      </div>

      {/* Mostrar las listas según el estado */}
      {mostrarBilleteras && <ListaBilleteras regBilletera={regBilletera} />}
      {mostrarMaxTransac && <MaxTransacciones maxTransacciones={getMaxTransac()} />}
    </>
  );
}

export default GestorBilleteraVirtual;
