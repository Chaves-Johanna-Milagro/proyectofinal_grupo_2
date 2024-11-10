import Phaser from 'phaser';

class Play02 extends Phaser.Scene{
//de momento se accede presionando el espacio en la escena Play
    constructor(){
        super("Play02");
        this.jugador = null;
        this.jugadorVida = null;
        this.vidas = null;
        this.cursors = null;
        this.fireBall = null;
        this.boss = null;
        this.enemigo = null;
        this.bossLife = 300;
        this.controlBossColision = null;
        this.intervalo=0;
    }
     init(data) {
        //this.puntaje = data.puntaje || 0; 
        this.puntaje = data.puntaje; 
        this.jugadorVida=data.jugadorVida;
        console.log(this.jugadorVida);
    }

    preload(){
        //son la misma imagen solo que una está volteada para que el layer no se vea cortado
        this.load.image('fondoLayer01','../public/resources/img/fondoLayer01.jpg');
        this.load.image('fondoLayer02','../public/resources/img/fondoLayer02.jpg');

        //audio
        this.load.audio('bossAudio', '../public/resources/audio/boss.mp3');

        //fireBall
        this.load.image('fireBall','../public/resources/img/fireBall.png');
    
        //player y balas
        this.load.spritesheet('nave02', '../public/resources/img/spritenave02.png', { frameWidth: 50, frameHeight: 46 });
        this.load.image('balaHorizontal', '../public/resources/img/balaHorizontal.png ')
        this.load.spritesheet('vidas', '../public/resources/img/vidas.png', { frameWidth: 127, frameHeight: 40 });

        this.load.image('vidaExtra', '../public/resources/img/vidaExtra.png');

        //enemigo y meteoro
        this.load.image('enemigo', '../public/resources/img/enemigo.png');
        this.load.image('meteoro', '../public/resources/img/meteoro.png');

        this.load.spritesheet('boss', '../public/resources/img/boss.png', { frameWidth: 190, frameHeight: 560 });
        
        this.load.spritesheet('explosion', '../public/resources/img/explosion.png', {frameWidth:32, frameHeight:32});
    }
    
    controlJugador(){
		
        if (this.cursors.left.isDown) {
          //  this.jugador.setVelocityX(-300);
            this.jugador.setVelocityX(-300);
        } 
        else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300);
        };
        if (this.cursors.up.isDown) {
            this.jugador.setVelocityY(-300);
            this.jugador.anims.play('down', true);
        }
        else if (this.cursors.down.isDown) {
            this.jugador.setVelocityY(300);
            this.jugador.anims.play('up', true);
        };
	
	}

    generarEnemigos() {
        const y = Phaser.Math.Between(0, 600);
        const enemigo = this.grupoEnemigos.create(this.sys.game.config.width, y, 'enemigo');
        enemigo.setVelocityX(-200);
    }

    eliminarEnemigo(bala,enemigo){
        bala.destroy();
        enemigo.setTexture('explosion');
        enemigo.play('explosion');
        //enemigo.destroy();
        this.puntaje +=10;
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);

    }

    quitarVida(jugador, enemigo, meteoro, balaJefe, balaEnemigo){
        enemigo.destroy();
        this.jugadorVida -= 1;
        console.log(this.jugadorVida);
    }

    generarVidas(){
        const y = Phaser.Math.Between(0, 600);
        const vida = this.grupoVidas.create(this.sys.game.config.width, y, 'vidaExtra');
        vida.setVelocityX(-200);        
    }
    agregarVida(jugador, vida){
        vida.destroy();
        this.jugadorVida += 1;
        if (this.jugadorVida >3){
            this.jugadorVida=3;
        }
        console.log(this.jugadorVida);
    }

    gameOver(jugador) {
        this.physics.pause();
        this.jugador.setTint(0xff0000);
        console.log('Game Over');
        this.bossAudio.stop();
        this.scene.start('GameOver', { puntaje: this.puntaje });
    }

    mostrarBoss(){
        //this.textoDePuntaje = this.add.text(16, 50, 'BOSS: ' + this.bossLife, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });
        this.boss.y=300;
        this.textoDeJefe = this.add.text(16, 50, 'BOSS: ' + this.bossLife, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });
        //el boss entra lentamente a la pantalla, seguramente hay una forma menos tosca de hacerlo pero es lo q se me ocurrio xd
        this.boss.setVelocityX(-100);
        this.time.addEvent({ delay: 600, callback: this.generarBalaJefe, callbackScope: this, loop: true });

        this.time.addEvent({ delay: 10000, callback: this.generarVidas, callbackScope: this, loop: true });
    }

    danarBoss(bala,boss,jugador){
        bala.destroy();
        
        this.bossLife -= 5;
        this.puntaje +=1;
        
        this.textoDeJefe.setText('BOSS: ' + this.bossLife);
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);
    }

    obstaculosVertical(){
        this.time.addEvent({ delay: 1000, callback: this.generarMeteoros, callbackScope: this, loop: true });
    }
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800);
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro');
        meteoro.setVelocityY(200);
    }
    destruirMeteoro(bala,meteoro){
        bala.destroy();
        
        meteoro.setTexture('explosion');
        meteoro.play('explosion');
        //enemigo.destroy();
        this.puntaje +=5;
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);
        this.time.delayedCall(50, meteoro.destroy(), [], this);
        
        //meteoro.destroy();
    }
    
    generarBalaJefe() {
		
        const y = Phaser.Math.Between(280,320 );
        //const bala = this.grupoMeteoros.create(this.boss.x, y, 'meteoro');
       // meteoro.setVelocityY(Phaser.Math.Between(-200,200));
      			
		const x = Phaser.Math.Between(0, 800);
        const balaJefe = this.grupoBalaJefe.create(this.boss.x-10,this.boss.y-50, 'balaHorizontal');

        balaJefe.setVelocityY(Phaser.Math.Between(-300, 300));
        
        balaJefe.setVelocityX(-600);
        
              
	}
	
	generarBalaEnemigo() {
		
        const y = Phaser.Math.Between(280,320 );
   		const x = Phaser.Math.Between(0, 800);
        const balaEnemigo = this.grupoBalaEnemigo.create(this.enemigo.x-10, this.enemigo.y, 'balaHorizontal');

        balaEnemigo.setVelocityY(Phaser.Math.Between(-300, 300));
        
        balaEnemigo.setVelocityX(-600);
        
              
	}
    
    
    victoria() {
        
        //this.playAudio.stop();
        this.sound.stopAll();
        this.scene.start('Victoria', { puntaje: this.puntaje });

    }
    
    dispararRayo(){
		this.bala = this.physics.add.image(this.jugador.x + 20, this.jugador.y, 'balaHorizontal');
            this.bala.setVelocityX(600);
	}
	
	init(data) {
        
        this.puntaje = data.puntaje || 0;
        this.jugador = null;
        this.jugadorVida = data.jugadorVida;
        this.vidas = null;
        this.cursors = null;
        this.fireBall = null;
        this.boss = null;
        this.bossLife = 300;
        this.controlBossColision = null;
    }
			
			

    create(){
		this.bossLife=300;
        this.controlBossColision = false;
        //almacenan las imagenes en una variable
        this.fondoLayer01 = this.add.image(0,300,'fondoLayer01').setOrigin(0,0.5);
        this.fondoLayer02 = this.add.image(800,300,'fondoLayer02').setOrigin(0,0.5);

        this.bossAudio = this.sound.add('bossAudio');
        const soundConfig = {
            volume: 1,
            loop: true
        };
        this.bossAudio.play(soundConfig);
        
        this.textoDePuntaje = this.add.text(16, 16, 'Puntaje: ' + this.puntaje, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });

        //creacion jugador
        this.jugador = this.physics.add.sprite(10, 300, 'nave02', 1);
        this.jugador.setCollideWorldBounds(true);

        this.vidas = this.add.sprite(73,570,'vidas',0);

        //creacion vidas extra
        this.grupoVidas = this.physics.add.group();
        this.physics.add.collider(this.jugador, this.grupoVidas,this.agregarVida, null, this);

        //creacion de los inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        //creacion enemigos
        this.grupoEnemigos = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarEnemigos, callbackScope: this, loop: true });
        
        this.grupoBalaJefe = this.physics.add.group();
        this.grupoBalaEnemigo = this.physics.add.group();

        this.grupoMeteoros = this.physics.add.group();
        


        //control colision
        this.physics.add.collider(this.jugador, this.grupoEnemigos, this.quitarVida, null, this);
        this.physics.add.collider(this.jugador, this.grupoBalaEnemigo, this.quitarVida, null, this);

        //animacion del jugador
        this.anims.create({
            key: 'down',
            frames: [{ key: 'nave02', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'default',
            frames: [{ key: 'nave02', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'up',
            frames: [{ key: 'nave02', frame: 0 }],
            frameRate: 20
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


        //boss
        this.boss = this.physics.add.sprite(1900, 1900, 'boss', 0);
        this.enemigo = this.physics.add.sprite(1900, 1900, 'boss', 0);
        
    
            //animacion
        this.anims.create({
            key: 'defaultBoss',
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.boss.anims.play('defaultBoss', true);

        //el boss aparece luego de 20 seg
        this.time.addEvent({ delay: 20000, callback: this.mostrarBoss, callbackScope: this, loop: false });
        
        
        this.time.addEvent({ delay: 600, callback: this.generarBalaEnemigo, callbackScope: this, loop: true });
        

        //conteo para aparicion de obstaculos en vertical
        this.time.addEvent({ delay: 60000, callback: this.obstaculosVertical, callbackScope: this, loop: false });
        
        //this.time.addEvent({ delay: 50, callback: this.generarBalaJefe, callbackScope: this, loop: true });
        
    }

    update(){
		
		 if(this.jugadorVida==0){
            this.gameOver();
            }
            
         else{
			 
			 
        //mueve las imagenes hace la izquierda
        this.fondoLayer01.x -= 2;
        this.fondoLayer02.x -= 2;
        
        
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
        
      

        //reposiciona las imagenes si salen de la pantalla
        if(this.fondoLayer01.x <= -780){
            this.fondoLayer01.x = this.fondoLayer02.x + this.fondoLayer02.width ;
        }
        if(this.fondoLayer02.x <= -780){
            this.fondoLayer02.x = this.fondoLayer01.x + this.fondoLayer01.width ;
        }

        //controles del jugador
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        this.jugador.anims.play('default', true);
        
        this.controlJugador();

                
        if(Phaser.Input.Keyboard.JustDown(this.cursors.z)){
			this.dispararRayo();
            

            //this.physics.add.collider(this.bala, this.grupoMeteoros, this.destruirMeteoro, null, this);

        
            //balas y enemigos
            this.physics.add.collider( this.bala ,this.grupoEnemigos, this.eliminarEnemigo, null, this);
            this.physics.add.collider(this.bala, this.grupoMeteoros, this.destruirMeteoro, null, this);
            this.physics.add.collider(this.jugador, this.grupoMeteoros,this.quitarVida, null, this);
            this.physics.add.collider(this.jugador, this.grupoBalaJefe,this.quitarVida, null, this);
            this.physics.add.collider(this.jugador, this.grupoBalaEnemigo,this.quitarVida, null, this);
            

            
            

            //destruye la bala cuando sale de la pantalla para que no ocupe memoria
            if(this.bala.y >= this.sys.game.config.width){
                this.bala.destroy();
            }
        }
        
        //boss
            // control de posicion x del boss para q se quede quieto al entrar a escena
        if (this.boss.x <= 700){
            this.boss.setVelocityX(0);
            this.controlBossColision = true;
            this.boss.setCollideWorldBounds(true);
        }
    
        //el boss no tiene colisiones con nada hasta haberse establecido completamente en escena
        if (this.controlBossColision == true){
            this.physics.add.collider(this.bala, this.boss, this.danarBoss, null, this);
            this.physics.add.collider(this.jugador, this.boss, this.gameOver, null, this);
           
            
            
            
        }
        
     
        if (this.bossLife <= 0){
			
		console.log('Gano');
		this.victoria();
		}
	}

        
    }
}  
export default Play02;
