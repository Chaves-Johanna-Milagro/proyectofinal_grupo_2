import React, { useState } from "react";
import { Button, Form, Row, Col, Card } from "react-bootstrap";
import ListaBilleteras from "./ListaBilleteras"; // Importa el componente para mostrar billeteras
import MaxTransacciones from "./MaxTransacciones"; // Importa el componente para mostrar las transacciones máximas

function GestorBilleteraVirtual() {
  const [regBilletera, setRegBilletera] = useState([]);
  const [nombre, setNombre] = useState("");
  const [billetera, setBilletera] = useState("");
  const [numTransac, setNumTransac] = useState("");

  // Estados para controlar la visibilidad de las listas
  const [mostrarBilleteras, setMostrarBilleteras] = useState(false);
  const [mostrarMaxTransac, setMostrarMaxTransac] = useState(false);

  //opciones para elegir la billetera
  const selectBillitera = ["Mercado Pago", "Uala", "PayPal", "Personal Pay","Brubank", "Naranja X"];

  // Función para registrar
  const registrar = () => {
    //verifica de los valores de nombre y billetera no esten vacios y que numTransac sea un numero , mayor a 0
    if (nombre && billetera && !isNaN(numTransac) && numTransac >= 0) {

      const newBilletera = { nombre, billetera, numTransac: parseInt(numTransac) };

      setRegBilletera([...regBilletera, newBilletera]); //toma todos los elementos de regBilletera y agrega al final la newBilletera
      
      //limpia los campos
      setNombre('');
      setBilletera('');
      setNumTransac('');
    } else {
      alert("Por favor, completa todos los campos correctamente");
    }
  };

  // Función para obtener el registro con la mayor cantidad de transacciones de cada usuario
  const getMaxTransac = () => {
    //agrupa las billeteras y encuentra la que tiene mas transacciopnes
    const maxTransaciones= regBilletera.reduce( (acc,current) => {     //acc vendria a ser el obj resultado y current seria el elemento actual del array
      //si no existe un registro para el usuario actual, asigna el primer registro
      if(!acc[current.nombre] || current.numTransac > acc[current.nombre].numTransac) {
        acc[current.nombre] = current;
      }

      return acc;
    }, {} );

    //convertir el resultado en un array
    return Object.values(maxTransaciones);
    
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
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Ej. Juan"/>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formBilletera">
              <Form.Label>Billetera virtual</Form.Label>
              <Form.Select
                style={{ color: 'black'}} 
                value={billetera}
                onChange={(e) => setBilletera(e.target.value)} 
                >
                <option value="">Seleccione una billetera</option>
                {selectBillitera.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
                </Form.Select>
            </Form.Group>          
          </Col>

          <Col className="pt-2">
            <Form.Group controlId="formNumTransac">
              <Form.Label>Numero de transacciones realizadas</Form.Label>
              <Form.Control
                type="number"
                value={numTransac}
                onChange={(e) => setNumTransac(Number(e.target.value))} 
                placeholder="Ej. 5"/>
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
