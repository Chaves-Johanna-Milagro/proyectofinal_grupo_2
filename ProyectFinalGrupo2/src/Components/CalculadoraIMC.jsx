import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/styles/Style.css';

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
        <section className="p-4">
            <Card className="p-5" style={{backgroundColor: 'rgba(0,0,0,0.8)'}} >
            <h1 className="text-white text-center mb-4">Calculadora del Índice de Masa Corporal (IMC)</h1>
            <Form className='text-white'>
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
                        onChange={(e) => setPeso(e.target.value)}
                        placeholder="Ej: 70.5"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Altura (m)</Form.Label>
                    <Form.Control
                        type="number"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        placeholder="Ej: 1.75"
                    />
                </Form.Group>
                <Button className="w-100 mt-3" onClick={calcularIMC}>Calcular IMC</Button>
            </Form>
            {imc && (
                <div className="text-white text-center mt-4">
                    <p><strong>Paciente:</strong> {apellido} {nombre}</p>
                    <p><strong>IMC:</strong> {imc}</p>
                    <p><strong>Nivel de peso:</strong> {nivelPeso}</p>
                </div>
            )}
           </Card>
        </section>
        
    );
}

export default CalculadoraIMC;

