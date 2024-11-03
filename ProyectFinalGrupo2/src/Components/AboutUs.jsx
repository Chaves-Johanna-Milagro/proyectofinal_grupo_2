import React from "react";
import aboutUsData from '../data/AboutUs.json';//seria como crear una variable o una referencia que contiene al json
import '../../public/styles/aboutUs.css';

function AboutUs(){
    
    return (
        <div className="conteiner">
            <h1>Sobre nosotros</h1>
            <div className="miembros">
            {aboutUsData.map((member) => (
                <div key={member.id}> 
                  <img src={member.photo}></img>
                  <h2>{member.name}</h2>
                  <h3>{member.rol}</h3>
                  <p>{member.description}</p> 
                </div>
            ))}
            </div>

        </div>
    );
};
export default AboutUs;