import Phaser from 'phaser';

class Play extends Phaser.Scene {
    constructor() {
        super("Play");
        this.jugador = null;
        this.bala = null;
        this.cursors = null;
        this.puntaje=0;
        this.jugadorVida = 3;
        this.vidas = null;
        this.controlExplosion = null;

    }

    init(data) {
        
        this.puntaje = data.puntaje || 0;
        this.jugadorVida = data.jugadorVida || 3;
    }

    preload() {
        this.load.image('cielo', '../public/resources/img/cielo.jpg');
        this.load.image('espacio1', '../public/resources/img/espacio1.jpg');
        //this.load.spritesheet('nave', '../juego/public/resources/img/spritenave.png', { frameWidth: 50, frameHeight: 46 });
        this.load.image('meteoro', '../public/resources/img/meteoro.png');
        //this.load.image('asteroide', '../public/resources/img/asteroide.png');
        
        this.load.image('balaVertical', '../public/resources/img/balaVertical.png ')
        
        this.load.spritesheet('vidas', '../public/resources/img/vidas.png', { frameWidth: 127, frameHeight: 40 });
        this.load.spritesheet('explosion', '../public/resources/img/explosion.png', {frameWidth:32, frameHeight:32});
        
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
				
		this.load.spritesheet({
            	key:'portal',
				url: '../public/resources/img/convert.png',
				frameConfig: {
					frameWidth: 100,
					frameHeight: 100,
					startFrame:0,
					endFrame: 162
					
					}
				});
				
		this.load.audio('playAudio', '../public/resources/audio/play.mp3');
		this.load.audio('energia', '../public/resources/audio/energy-90321.mp3');
		this.load.audio('portal', '../public/resources/audio/warp-sfx-6897.mp3');
		this.load.audio('choque', '../public/resources/audio/explosionEnemigo.mp3');
		this.load.audio('moneda', '../public/resources/audio/retro-coin.mp3');
		
		this.load.audioSprite('laser', '../public/resources/audio/laser.json', ['../public/resources/audio/lasergun-35817.mp3']);
		this.load.audioSprite('explosiones', '../public/resources/audio/explosiones.json', ['../public/resources/audio/explosiones.mp3']);
    }
    
    controlJugador(){
		
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300);
            this.jugador.anims.play('izquierda', true);
        } 
        else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300);
            this.jugador.anims.play('derecha', true);
        };
        if (this.cursors.up.isDown) {
            this.jugador.setVelocityY(-300);
            
        }
        else if (this.cursors.down.isDown) {
            this.jugador.setVelocityY(300);
            
        };
	
	}

    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800);
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro');
        meteoro.setVelocityY(200);
    }
    
    generarPortal(){
		
		this.textoPortal = this.add.text(400, 300, 'Se ha abierto un portal a un nivel secreto', { fontFamily: 'impact', fontSize: '24px', fill: '#fff', align: 'center'  }).setOrigin(0.5);
        var tportal=this.tweens.add({
			targets:this.textoPortal,
			visible: true,
			alpha: 0,
			ease: "Power 3",
			duration: 8000,
			onComplete:function(){
				tportal.remove();
			}
        
        });
        
		this.meteoroSpecial = this.physics.add.sprite(Phaser.Math.Between(0, 800), 70, 'portal');
		this.meteoroSpecial.play('portal');
        this.meteoroSpecial.setCollideWorldBounds(true);
        
        this.physics.add.overlap(this.jugador, this.meteoroSpecial, this.bonusTrack, null, this);	
        this.meteoroSpecial.setVelocityY(Phaser.Math.Between(-50, 50));
        this.meteoroSpecial.setVelocityX(Phaser.Math.Between(-50, 50));
        
        
        
        
	}
    
       
    destruirMeteoro(bala,meteoro){
        bala.destroy();
        meteoro.physics.body(null);
        meteoro.setTexture('explosion');
        meteoro.play('explosion');
        this.puntaje +=5;
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);
        this.time.delayedCall(50, meteoro.destroy(), [], this);
        this.sound.playAudioSprite('explosiones','explosion1');
        
        //meteoro.destroy();
    }

    gameOver() {
        this.physics.pause();
        this.jugador.setTint(0xff0000);
        console.log('Game Over');
        this.playAudio.stop();
        this.scene.start('GameOver', { puntaje: this.puntaje });
    }

    bonusTrack() {
        
        this.sound.play('portal');
        this.playAudio.stop();
        this.scene.start('BonusTrack', { puntaje: this.puntaje, jugadorVida: this.jugadorVida });
    }
    
    dispararRayo(){
		this.bala = this.physics.add.image(this.jugador.x, this.jugador.y-20, 'balaVertical');
            this.bala.setVelocityY(-600)
            this.sound.playAudioSprite('laser','laser1');
	}
	
	quitarVida(jugador, enemigo, meteoro,balaJefe){
        enemigo.destroy();
        this.jugadorVida -= 1;
        this.sound.play('choque');
        this.cameras.main.shake(1000,0.005);
        console.log(this.jugadorVida);
    }
    
    destruirMeteoro(bala,meteoro){
        bala.destroy();
        meteoro.setTexture('explosion');
        meteoro.play('explosion');
        this.sound.playAudioSprite('explosiones','explosion1');
        //enemigo.destroy();
        this.puntaje +=5;
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);
    }
	


    create() {
		//this.puntaje=0;
        //this.add.image(400, 300, 'cielo');
		this.espacio1 = this.add.tileSprite(0,0,800,600, 'espacio1').setScale(2);

       
        this.playAudio = this.sound.add('playAudio');
        const soundConfig = {
            volume: 1,
            loop: true
        };
        this.playAudio.play(soundConfig);
        
        this.vidas = this.add.sprite(73,570,'vidas',0);

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
        this.physics.add.collider(this.jugador, this.grupoMeteoros, this.quitarVida, null, this);
        

      /*  //creacion meteoro para ingresar al bonus
        this.meteoroSpecial = this.physics.add.sprite(200, 0, 'asteroide');
        this.meteoroSpecial.setCollideWorldBounds(true);
        this.physics.add.overlap(this.jugador, this.meteoroSpecial, this.bonusTrack, null, this);*/
        
        //muestra puntaje
        this.textoDePuntaje = this.add.text(16, 16, 'Puntaje: ' + this.puntaje, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });
        
        //animacion del jugador
        this.anims.create({
            key: 'izquierda',
            frames: this.anims.generateFrameNumbers('nave', {frames:[0,1]}),
            frameRate: 20,
            repeat:-1
        });
        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNumbers('nave', {frames:[2,3]}),
            frameRate: 20,
            repeat:-1
        });
        this.anims.create({
            key: 'derecha',
            frames: this.anims.generateFrameNumbers('nave', {frames:[4,5]}),
            frameRate: 20,
			repeat:-1
            
        });
        
        //muestra de la vida
        this.anims.create({
            key: '3',
            frames: [{ key: 'vidas', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: '2',
            frames: [{ key: 'vidas', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: '1',
            frames: [{ key: 'vidas', frame: 2 }],
            frameRate: 20
        });
        
         //animación de explosión
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:4}),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true,
            destroyOnComplete: true
            });
            
            
             //animación de explosión
        this.anims.create({
            key: 'portal',
            frames: this.anims.generateFrameNumbers('portal', {start:0, end:162}),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: false,
            destroyOnComplete: false
            });
        
			

        //utilizado para acceder a la Play02
        /*this.input.keyboard.once('keydown-SPACE', () =>{
            this.playAudio.stop();
            this.scene.start('Play02');
        });*/
        
        
        this.textoMover = this.add.text(400, 300, 'Para mover la nave use los cursores del teclado \n Para disparar use [Z]', { fontFamily: 'impact', fontSize: '24px', fill: '#fff', align: 'center'  }).setOrigin(0.5);
        var tmover=this.tweens.add({
			targets:this.textoMover,
			visible: true,
			alpha: 0,
			//ease: "Power 3",
			ease: "quintic",
			duration: 6000,
			onComplete:function(){
				tmover.remove();
			}
        
        });
                       
        this.time.addEvent({ delay: 15000, callback: this.generarPortal, callbackScope: this, loop: true });

        
        
    }

    update() {
		
		
		
		 if(this.jugadorVida==0){
            this.gameOver();
            }
            
         else{
			 
			  //control vida jugador
        if(this.jugadorVida==3){
            this.vidas.anims.play('3', true);
        } 
        if(this.jugadorVida==2){
            this.vidas.anims.play('2', true);
        }  
        if(this.jugadorVida==1){
            this.vidas.anims.play('1', true);
        }
        
       // this.time.addEvent({ delay: 15000, callback: this.generarPortal, callbackScope: this, loop: false });
		
        //controles del jugador
        this.espacio1.tilePositionY -= 0.1;
        
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        this.jugador.anims.play('normal', true);

		this.controlJugador();
       
      
        
        if(Phaser.Input.Keyboard.JustDown(this.cursors.z)){
			this.dispararRayo();

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
            this.scene.start('Play02', { puntaje: this.puntaje, jugadorVida: this.jugadorVida });
        }
    }
}
}

export default Play;
