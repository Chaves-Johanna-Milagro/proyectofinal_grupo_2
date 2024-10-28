import { useEffect } from "react";

import Phaser from 'phaser';

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
            mode:Phaser.Scale.FIT,
            autoCenter:Phaser.Scale.CENTER_BOTH,
            width: 800,
            height: 600,
        
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

    },[]);
}
export default JuegoPhaser;