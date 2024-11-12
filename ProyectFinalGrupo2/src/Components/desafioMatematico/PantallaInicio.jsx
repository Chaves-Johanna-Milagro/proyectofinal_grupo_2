import React from 'react';
import { Button, Figure, Row, Col,Card } from "react-bootstrap";
import '../../../public/styles/DesafioMatematico.css';

function PantallaInicio({ iniciarJuego }) {
    return (
        <section className='pantallaInicio'>
            <Card className="card-img p-4">
            <Row className='align-items-center'>
                <h1>Desafío Matemático</h1>
                <Col md={15}>
                   <div>
                   <p>Seleccione el nivel de dificultad:</p>
                   <Button className="w-100 mt-4" onClick={() => iniciarJuego('basico')}>Básico<Figure>
                                    <Figure.Image
                                        src='../../public/img/basico.png'
                                        width="200px"
                                    />
                                </Figure></Button>
                   
                   <Button className="w-100 mt-5" onClick={() => iniciarJuego('intermedio')}>Intermedio<Figure>
                                    <Figure.Image
                                        src='../../public/img/intermedio.png'
                                        width="200px"
                                    />
                                </Figure></Button>
                   <Button className="w-100 mt-5" onClick={() => iniciarJuego('avanzado')}>Avanzado<Figure>
                                    <Figure.Image
                                        src='../../public/img/avanzado.png'
                                        width="200px"
                                    />
                                </Figure></Button>
                   </div>               
                </Col>
               
            </Row>
            </Card>
        </section>
    );
}

export default PantallaInicio;
