import React from 'react';
import { Button, Container, Row, Col } from "react-bootstrap";
import '../../../public/styles/DesafioMatematico.css';

function PantallaInicio({ iniciarJuego }) {
    return (
        <Container className='pantallaInicio'>
            <Row>
                <h1>Desafío Matemático</h1>
                <Col md={4}>
                   <div>
                   <p>Seleccione el nivel de dificultad:</p>
                   <Button className="w-100 mt-3" onClick={() => iniciarJuego('basico')}>Básico</Button>
                   <Button className="w-100 mt-3" onClick={() => iniciarJuego('intermedio')}>Intermedio</Button>
                   <Button className="w-100 mt-3" onClick={() => iniciarJuego('avanzado')}>Avanzado</Button>
                   </div>               
                </Col>
            </Row>

        </Container>
    );
}

export default PantallaInicio;
