import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/styles/style.css';

function CalculadoraIMC() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [nivelPeso, setNivelPeso] = useState('');

    const calcularIMC = () => {
        if (!nombre || !apellido || peso <= 0 || altura <= 0) {
            alert("Por favor, completa todos los campos con valores válidos.");
            return;
        }

        const imcCalculado = peso / (altura * altura);
        setImc(imcCalculado.toFixed(2));
        
        let nivel;
        if (imcCalculado < 18.5) nivel = "Bajo peso";
        else if (imcCalculado < 24.9) nivel = "Peso saludable";
        else if (imcCalculado < 29.9) nivel = "Sobrepeso";
        else nivel = "Obesidad";
        
        setNivelPeso(nivel);
    };

    return (
        <Container className="calculadora mt-5">
            <h1 className="text-center mb-4">Calculadora del Índice de Masa Corporal (IMC)</h1>
            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Escribe tu nombre"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                placeholder="Escribe tu apellido"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Peso (kg)</Form.Label>
                    <Form.Control
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(parseFloat(e.target.value))}
                        placeholder="Ej: 70.5"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Altura (m)</Form.Label>
                    <Form.Control
                        type="number"
                        value={altura}
                        onChange={(e) => setAltura(parseFloat(e.target.value))}
                        placeholder="Ej: 1.75"
                    />
                </Form.Group>
                <Button className="w-100 mt-3" onClick={calcularIMC}>Calcular IMC</Button>
            </Form>
            {imc && (
                <div className="resultado text-center mt-4">
                    <p><strong>Paciente:</strong> {apellido} {nombre}</p>
                    <p><strong>IMC:</strong> {imc}</p>
                    <p><strong>Nivel de peso:</strong> {nivelPeso}</p>
                </div>
            )}
        </Container>
    );
}

export default CalculadoraIMC;

