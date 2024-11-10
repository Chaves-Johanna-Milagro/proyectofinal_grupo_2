import React from 'react';
import { Card,Row ,Col } from 'react-bootstrap';
import '../../../public/styles/DesafioMatematico.css';

function PantallaLogro() {
    return (
        <div className='pantallaLogro'>
            <Card className='card'>
                <Row className='align-items-center'>
                    <Col>
                    <h1>¡Felicitaciones! Superaste el desafío matemático.</h1>
                    </Col>
                </Row>
            </Card>
            
        </div>
    );
}

export default PantallaLogro;
