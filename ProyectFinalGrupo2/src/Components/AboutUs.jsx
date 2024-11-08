import React from "react";
import aboutUsData from '../data/AboutUs.json';//seria como crear una variable o una referencia que contiene al json
import {  Card, Row, Col, Image } from 'react-bootstrap';
import '../../public/styles/AboutUs.css';

function AboutUs(){
    return (

            <section className="aboutUs">
                <Card className="text-center">
                    <h1>Sobre Nosotros</h1>                    
                    <Card.Body>
                        <Row>
                        {aboutUsData.map((member) => (
                            <Col key={member.id} xs={12} sm={6} md={6} lg={3}> 
                                <Image src={member.photo} roundedCircle></Image>
                                <Card.Title>{member.name}</Card.Title>
                                <Card.Subtitle>{member.rol}</Card.Subtitle>
                                <Card.Text>{member.description}</Card.Text>
                                <a href={member.github} target="blank">Repositorio GitHub</a> 
                            </Col>
                        ))}
                        </Row>                         
                    </Card.Body>
                  
                </Card>

            </section>



    );
};
export default AboutUs;
