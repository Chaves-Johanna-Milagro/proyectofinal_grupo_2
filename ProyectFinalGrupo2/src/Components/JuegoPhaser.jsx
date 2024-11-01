import { useEffect } from "react";
import '../../public/styles/Phaser.css';

import Phaser, { Scale } from 'phaser';

import Menu from '../Scenes/Menu';
import Play from '../Scenes/Play';
import Play02 from '../Scenes/Play02';
import BonusTrack from '../Scenes/BonusTrack';
import GameOver from '../Scenes/GameOver';
import Victoria from '../Scenes/Victoria';

function JuegoPhaser(){

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            backgroundColor: '#30303e',
            width: window.innerWidth,
            height: window.innerHeight,

            parent: 'phaser-game',
            Scale: {
                mode: Phaser.Scale.FIT, // redimencionamiento automatico
                autoCenter:Phaser.Scale.CENTER_BOTH
            },
        
            physics:{
                default: 'arcade',
                arcade: {
                    gravity: {y:0},
                    debug: false
                }
            },
        
            scene: [Menu,Play,GameOver,BonusTrack,Play02,Victoria]
        };
        
        let game = new Phaser.Game(config);

        //redimencionará al momento que cambie el tamaño de la pantalla
        const handleResize = () => {
           game.scale.resize(window.innerWidth, window.innerHeight);
        };
  
        window.addEventListener("resize", handleResize);
  
        // elimina el juego y el redimencionamiento cuando el componente se desmonte
        return () => {
         window.removeEventListener("resize", handleResize);
         game.destroy(true); // Destruye el juego para liberar recursos
        };

    },[]);

    return (
        <div id='phaser-game' style={{ width: "100vw", height: "100vh", overflow: "hidden"}} />
    );
}
export default JuegoPhaser;