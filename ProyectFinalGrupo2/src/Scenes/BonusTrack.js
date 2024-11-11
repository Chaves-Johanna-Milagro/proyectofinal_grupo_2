import Phaser from 'phaser';

class BonusTrack extends Phaser.Scene {

    constructor() {
        super('BonusTrack');
        this.jugador = null;
        this.cursors = null;
        this.grupoMonedas = null; 
        this.puntaje = 0; 
        this.textoDePuntaje = null;
        this.timer = null;
        this.jugadorVida = null;
        this.vidas=null;

    }

    init(data) {
        this.puntaje = data.puntaje || 0; 
        this.jugadorVida=data.jugadorVida;
    }

    preload() {
        this.load.image('espacio', '../public/resources/img/espacio.jpg');
        this.load.spritesheet('nave', '../public/resources/img/spritenaveB.png', { frameWidth: 50, frameHeight: 46 });
        this.load.spritesheet('moneda', '../public/resources/img/monedas32.png', { frameWidth: 32, frameHeight: 32 });
        this.load.audio('bonusAudio', '../public/resources/audio/bonus.mp3');
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    generarMonedas() {
        const x = Phaser.Math.Between(0, 800); 
        const moneda = this.grupoMonedas.create(x, 0, 'moneda');
        moneda.setVelocityY(200);
        moneda.play('girar');
        moneda.setScale(0.7);
    }

    collectCoin(jugador, moneda) {
        moneda.destroy();
        this.puntaje += 500; 
        this.textoDePuntaje.setText('Puntaje: ' + this.puntaje);
        this.sound.play('moneda');
        
    }
    
    vidaExtra(){
		if(this.puntaje > 3500 && this.jugadorVida < 3){
			this.textoVida1 = this.add.text(400, 300, 'Recuperaste una vida', { fontFamily: 'impact', fontSize: '24px', fill: '#fff', align: 'center'  }).setOrigin(0.5);
        var tsecreto=this.tweens.add({
			targets:this.textoVida1,
			visible: true,
			alpha: 0,
			ease: "Power 3",
			duration: 8000,
			onComplete:function(){
				tsecreto.remove();
			}
        
        });
			this.jugadorVida += 1;
			this.sound.play('energia');
		}
		
	}

    endBonusTrack() {
        this.bonusAudio.stop();
        this.vidaExtra();
        
        this.scene.start('Play', { puntaje: this.puntaje, jugadorVida: this.jugadorVida	 });
    }

    animacionPlayer() {
        this.anims.create({
            key: 'izquierda',
            frames: [{ key: 'nave', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'normal',
            frames: [{ key: 'nave', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'derecha',
            frames: [{ key: 'nave', frame: 2 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'girar',
            frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }

    create() {
        this.add.image(400, 300, 'espacio').setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.bonusAudio = this.sound.add('bonusAudio');
        const soundConfig = { volume: 1, loop: true };
        this.bonusAudio.play(soundConfig);
        
        this.vidas = this.add.sprite(73,570,'vidas',0);

        this.jugador = this.physics.add.sprite(400, 550, 'nave', 1);
        this.jugador.setCollideWorldBounds(true);
        
        this.animacionPlayer();

        this.grupoMonedas = this.physics.add.group();
        this.time.addEvent({ delay: 500, callback: this.generarMonedas, callbackScope: this, loop: true });

        this.physics.add.collider(this.jugador, this.grupoMonedas, this.collectCoin, null, this);

        this.textoDePuntaje = this.add.text(16, 16, 'Puntaje: ' + this.puntaje, { fontFamily: 'impact', fontSize: '32px', fill: '#fff' });
        
        
            
        this.textoNivelSecreto = this.add.text(400, 300, 'Armas desactivadas \n Recolecta monedas para recuperar una vida \n (Si perdiste alguna)', { fontFamily: 'impact', fontSize: '24px', fill: '#fff', align: 'center'  }).setOrigin(0.5);
        var tsecreto=this.tweens.add({
			targets:this.textoNivelSecreto,
			visible: true,
			alpha: 0,
			ease: "Power 3",
			duration: 8000,
			onComplete:function(){
				tsecreto.remove();
			}
        
        });
        

     
        this.time.delayedCall(8000, this.endBonusTrack, [], this);

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
        };
        
       
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

}

    }
}

export default BonusTrack;
