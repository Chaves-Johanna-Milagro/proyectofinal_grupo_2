import React, { useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
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
    <section className="p-4">
      <Card className="p-5" style={{backgroundColor: 'rgba(0,0,0,0.8)'}} >
      <h1 className="text-white text-center mb-4">Gestor de Transacciones en Billeteras Virtuales</h1>
      <Form>
  
        <Row className="align-items-center text-white">
          <Col md={6}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formBilletera">
              <Form.Label>Billetera virtual</Form.Label>
              <Form.Control
                type="text"
                value={billetera}
                onChange={(e) => setBilletera(e.target.value)} />
            </Form.Group>          
          </Col>

          <Col className="pt-2">
            <Form.Group controlId="formNumTransac">
              <Form.Label>Numero de transacciones realizadas</Form.Label>
              <Form.Control
                type="number"
                value={numTransac}
                onChange={(e) => setNumTransac(Number(e.target.value))} />
            </Form.Group>  

            <Button className="w-100 mt-3" variant="primary" onClick={registrar}>Registrar</Button>

            <Button
              className="w-100 mt-3"
              variant={mostrarBilleteras ? "secondary" : "primary"}
              onClick={() => setMostrarBilleteras(!mostrarBilleteras)}>
              {mostrarBilleteras ? "Ocultar Billeteras Registradas" : "Mostrar Billeteras Registradas"}
            </Button>

            <Button
              className=" w-100 mt-3"
              variant={mostrarMaxTransac ? "secondary" : "primary"}
              onClick={() => setMostrarMaxTransac(!mostrarMaxTransac)}>
              {mostrarMaxTransac ? "Ocultar Mayor Cantidad de Transacciones" : "Mostrar Mayor Cantidad de Transacciones"}
            </Button>            

          </Col>
        </Row>

      </Form>

      <Row>
      {/* Mostrar las listas según el estado */}
      <Col className="pt-2" md={6}>
        {mostrarBilleteras && <ListaBilleteras regBilletera={regBilletera} />}      
      </Col>
      <Col className="pt-2" md={6}>
        {mostrarMaxTransac && <MaxTransacciones maxTransacciones={getMaxTransac()} />}      
      </Col>
     </Row>
     </Card>
    </section>
  );
}

export default GestorBilleteraVirtual;
