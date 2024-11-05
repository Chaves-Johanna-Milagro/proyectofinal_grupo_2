import React from "react";
import { Container, Card, Row, Col, Figure } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../public/styles/style.css';


function Home(){
    return(
        <>
            <main className="section">
                <Container>
                    <section className="principal">
                        <Figure className="image">
                            <Figure.Image
                                className="img-prin"
                                src='../../public/img/principal.png'
                                alt="Imagen principal"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Figure>
                    </section>

                    <section className="articulos">
                        <Row className="align-items-center">
                            <Col md={9}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Sobre la empresa</Card.Title>
                                        <Card.Text>
                                            Somos un pequeño grupo de desarrolladores que busca crear nuevos e innovadores juegos.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Figure className="image">
                                    <Figure.Image
                                        src='../../public/img/empresa.png'
                                        alt="Empresa"
                                        width="200px"
                                    />
                                </Figure>
                            </Col>
                        </Row>

                        <Row className="align-items-center">
                            <Col md={3}>
                                <Figure className="image">
                                    <Figure.Image
                                        src='../../public/img/miembros.png'
                                        alt="Miembros"
                                        width="300px"
                                    />
                                </Figure>
                            </Col>
                            <Col md={9}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Miembros</Card.Title>
                                        <Card.Text>
                                            Nuestra empresa cuenta con los siguientes trabajadores:
                                        </Card.Text>
                                        <ul className="listaIntegrantes">
                                            <li>Castro Jose</li>
                                            <li>Chaves Johanna</li>
                                            <li>Goitea Mateo Nicolás</li>
                                            <li>Flores Chavez Edgar Franco</li>
                                            <li>Jimenez Jesús Gabriel</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row className="align-items-center">
                            <Col md={9}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Plataformas</Card.Title>
                                        <Card.Text>
                                            Planeamos crear juegos para diversas plataformas: Windows, MacOS, Android y consolas.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Figure className="image">
                                    <Figure.Image
                                        src='../../public/img/plataformas.png'
                                        alt="Plataformas"
                                        width="300px"
                                    />
                                </Figure>
                            </Col>
                        </Row>

                        <Row className="align-items-center">
                            <Col md={3}>
                                <Figure className="image">
                                    <Figure.Image
                                        src='../../public/img/contacto.png'
                                        alt="Contacto"
                                        width="100px"
                                    />
                                </Figure>
                            </Col>
                            <Col md={9}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Contacto</Card.Title>
                                        <Card.Text>
                                            Para consultas mandar un correo a grupo2Contacto@gmail.com
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </main>

        </>

    );
}
export default Home;