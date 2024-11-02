import React from "react";
import aboutUsData from '../data/AboutUs.json';//seria como crear una variable o una referencia que contiene al json

function AboutUs(){
    
    return (
        <div>
            <h1>Sobre nosotros</h1>
            {aboutUsData.map((member) => (
                <div key={member.id}> 
                  <h2>{member.name}</h2>
                  <h3>{member.rol}</h3>
                  <p>{member.description}</p> 
                </div>
            ))}

        </div>
    );
};
export default AboutUs;