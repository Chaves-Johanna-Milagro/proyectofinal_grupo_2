import React from 'react';
import { Card,Row ,Col } from 'react-bootstrap';
import '../../../public/styles/DesafioMatematico.css';

function PantallaDerrota() {
    return (
        <div className='pantallaDerrota'>
            <Card className='card'>
                <Row className='align-items-center'>
                    <Col md={6}>
                    <h1>No lograste superar el desafío matemático.</h1>
                    </Col>
                </Row>
            </Card>
            
        </div>
    );
}

export default PantallaDerrota;
