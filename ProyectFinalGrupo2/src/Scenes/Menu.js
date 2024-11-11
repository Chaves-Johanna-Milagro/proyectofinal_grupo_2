import Phaser from 'phaser';

class Menu extends Phaser.Scene{
    constructor(){
        super ("Menu");
    }

    preload(){
        this.load.image('menu', '../public/resources/img/menu.png');

        this.load.audio('menuAudio', '../public/resources/audio/menu.mp3');
    }

    create(){
        //imagen
        this.add.image(400,300,'menu');

        //audio
        this.menuAudio = this.sound.add('menuAudio');
        const soundConfig = {
            volume: 1,
            loop: true
        };
        this.menuAudio.play(soundConfig);

        //texto
        this.add.text(300,150,'SPACE GAME', {fontFamily: 'impact' ,fontSize:'100px', fill: '#fff'}).setOrigin(0.5);
        this.add.text(400,400,'Barra espaciadora para jugar', {fontFamily: 'impact', fontSize: '32px', fill: '#fff'}).setOrigin(0.5);
    
        //iniciar juego presionando space
        this.input.keyboard.once('keydown-SPACE', () =>{
            this.menuAudio.stop();
            this.scene.start('Play');
        })
    }
}
export default Menu;
