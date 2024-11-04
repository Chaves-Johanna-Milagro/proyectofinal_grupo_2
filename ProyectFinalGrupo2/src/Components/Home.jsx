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
                                src="img/principal.png"
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
                                <Figure>
                                    <Figure.Image
                                        src="imagenes/empresa.png"
                                        alt="Empresa"
                                        width="200px"
                                    />
                                </Figure>
                            </Col>
                        </Row>

                        <Row className="align-items-center">
                            <Col md={3}>
                                <Figure>
                                    <Figure.Image
                                        src="imagenes/miembros.png"
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
                                        <ul>
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
                                <Figure>
                                    <Figure.Image
                                        src="imagenes/plataformas.png"
                                        alt="Plataformas"
                                        width="300px"
                                    />
                                </Figure>
                            </Col>
                        </Row>

                        <Row className="align-items-center">
                            <Col md={3}>
                                <Figure>
                                    <Figure.Image
                                        src="imagenes/contacto.png"
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

            <footer className="footer bg-dark text-center text-white">
                <Container>
                    <p>Fundamentos de Programación Web - TUDIVJ - UNJu</p>
                </Container>
            </footer>
        </>

    );
}
export default Home;