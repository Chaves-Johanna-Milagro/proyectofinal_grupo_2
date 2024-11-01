import Phaser from 'phaser';

class Play extends Phaser.Scene {
    constructor() {
        super("Play");
        this.jugador = null;
        this.bala = null;
        this.cursors = null;
        this.puntaje=0;
    }

    init(data) {
        
        this.puntaje = data.puntaje || 0;;
    }

    preload() {
        this.load.image('cielo', '../public/resources/img/cielo.jpg');
        //this.load.spritesheet('nave', '../juego/public/resources/img/spritenave.png', { frameWidth: 50, frameHeight: 46 });
        this.load.image('meteoro', '../public/resources/img/meteoro.png');
        this.load.image('asteroide', '../public/resources/img/asteroide.png');
        this.load.audio('playAudio', '../public/resources/audio/play.mp3');
        this.load.image('balaVertical', '../public/resources/img/balaVertical.png ')
        
        this.load.spritesheet({
            	key:'nave',
				url: '../public/resources/img/spritenaveB.png',
				frameConfig: {
					frameWidth: 50,
					frameHeight: 46,
					startFrame:0,
					endFrame: 5
					
					}
				});
    }

    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800);
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro');
        meteoro.setVelocityY(200);
    }
    
    destruirMeteoro(bala,meteoro){
        bala.destroy();
        meteoro.destroy();
    }

    gameOver(jugador) {
        this.physics.pause();
        jugador.setTint(0xff0000);
        console.log('Game Over');
        this.playAudio.stop();
        this.scene.start('GameOver', { puntaje: this.puntaje });
    }

    bonusTrack() {
        
        this.playAudio.stop();
        this.scene.start('BonusTrack', { puntaje: this.puntaje });
    }


    create() {
		//this.puntaje=0;
        this.add.image(400, 300, 'cielo');

       
        this.playAudio = this.sound.add('playAudio');
        const soundConfig = {
            volume: 1,
            loop: true
        };
        this.playAudio.play(soundConfig);

        //creacion jugador
        this.jugador = this.physics.add.sprite(400, 550, 'nave', 1);
        this.jugador.setCollideWorldBounds(true);

        //creacion de los inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    
        //creacion meteoros
        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarMeteoros, callbackScope: this, loop: true });
        
        
    
        //control colision
        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.gameOver, null, this);
        

        //creacion meteoro para ingresar al bonus
        this.meteoroSpecial = this.physics.add.sprite(200, 0, 'asteroide');
        this.meteoroSpecial.setCollideWorldBounds(true);
        this.physics.add.overlap(this.jugador, this.meteoroSpecial, this.bonusTrack, null, this);
        
        //muestra puntaje
        this.textoDePuntaje = this.add.text(16, 16, 'Puntaje: ' + this.puntaje, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });
        
        //animacion del jugador
        this.anims.create({
            key: 'izquierda',
            //frames: [{ key: 'nave', frame: 0 }],
            frames: this.anims.generateFrameNumbers('nave', {frames:[0,1]}),
            frameRate: 20,
            repeat:-1
        });
        this.anims.create({
            key: 'normal',
            //frames: [{ key: 'nave', frame: 1 }],
            frames: this.anims.generateFrameNumbers('nave', {frames:[2,3]}),
            frameRate: 20,
            repeat:-1
        });
        this.anims.create({
            key: 'derecha',
            frames: this.anims.generateFrameNumbers('nave', {frames:[4,5]}),
        //  frames: [{ key: 'nave', frame: 2 }],
            frameRate: 20,
			repeat:-1
            
        });
        
			

        //utilizado para acceder a la Play02
        /*this.input.keyboard.once('keydown-SPACE', () =>{
            this.playAudio.stop();
            this.scene.start('Play02');
        });*/
    }

    update() {
        //controles del jugador
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        this.jugador.anims.play('normal', true);

        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300);
            this.jugador.anims.play('izquierda', true);
        } 
        else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300);
            this.jugador.anims.play('derecha', true);
        }
        else if (this.cursors.up.isDown) {
            this.jugador.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown) {
            this.jugador.setVelocityY(300);
        }
        
        if(this.cursors.z.isDown){
			this.bala = this.physics.add.image(this.jugador.x, this.jugador.y - 20, 'balaVertical');
            this.bala.setVelocityY(-600);

            this.physics.add.collider(this.bala, this.grupoMeteoros, this.destruirMeteoro, null, this);
            

            //destruye la bala cuando sale de la pantalla para que no ocupe memoria
            if(this.bala.y >= this.sys.game.config.height){
                this.bala.destroy();
            }
        }

        this.puntaje += 1;
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);

        if (this.puntaje >= 2000){
            this.playAudio.stop();
            this.scene.start('Play02', { puntaje: this.puntaje });
        }
    }
}

export default Play;
