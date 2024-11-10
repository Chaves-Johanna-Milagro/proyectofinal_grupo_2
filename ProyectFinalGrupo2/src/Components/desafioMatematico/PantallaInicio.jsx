import React from 'react';
import { Button, Figure, Row, Col,Card } from "react-bootstrap";
import '../../../public/styles/DesafioMatematico.css';

function PantallaInicio({ iniciarJuego }) {
    return (
        <section className='pantallaInicio'>
            <Card className="card-img p-5">
            <Row className='align-items-center'>
                <h1>Desafío Matemático</h1>
                <Col md={6}>
                   <div>
                   <p>Seleccione el nivel de dificultad:</p>
                   <Button className="w-100 mt-3" onClick={() => iniciarJuego('basico')}>Básico</Button>
                   <Button className="w-100 mt-3" onClick={() => iniciarJuego('intermedio')}>Intermedio</Button>
                   <Button className="w-100 mt-3" onClick={() => iniciarJuego('avanzado')}>Avanzado</Button>
                   </div>               
                </Col>
                <Col md={3}>
                    <Figure className="w-100 mt-3">
                        <Figure.Image 
                        src='../../public/img/DFInicio.gif'
                        alt="img"
                        width="400px">
                        </Figure.Image>
                    </Figure>
                </Col>
            </Row>
            </Card>
        </section>
    );
}

export default PantallaInicio;
