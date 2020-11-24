class SceneMain extends Phaser.Scene 
{
    constructor() 
    {
        super('SceneMain');
    }
    preload() 
    {
        // carrega as imagens
        this.load.image('plane', 'images/plane_1_red.png');
        this.load.image('curse', 'images/hazard_base.png');
        //carrega os audios
        this.load.audio("planeSound1",["sons/loop_aviao_alterado(continuo).mp3"], "sons/loop_aviao_alterado(continuo).ogg");
        this.load.audio("planeSound2",["sons/loop_aviao_alterado(parte_interior).mp3"], "sons/loop_aviao_alterado(parte_interior).ogg");
        this.load.audio("planeJumpSound", ["sons/404793__owlstorm__retro-video-game-sfx-jump.wav"]);
        this.load.audio("music1Action", ["sons/ActionMusicEditada.wav"]);
    }
    create() 
    {
        //Sons do avião
        this.planeSound1 = this.sound.add('planeSound1', {volume: 0.3});
        this.planeSound2 = this.sound.add('planeSound2', {volume: 0.3});
        this.planeJumpSound = this.sound.add('planeJumpSound', {volume: 0.3});
        //Musica
        this.music1Action = this.sound.add('music1Action', {volume: 0.3});
        //Play the sounds and loop those that should loop
        this.planeSound1.play();
        this.planeSound2.play();
        this.music1Action.play();

        this.planeSound1.loop = true;
        this.planeSound2.loop = true;
        this.music1Action.loop = true;

        // adiciona o score no jogo
        this.score = -1;
        this.labelScore = this.add.text(20, 20, 'score: 0',
            {
                fontFamily: 'courier new',
                color: '#ffffff',
                fontSize: '20px'
            });

        // cria um grupo de canos
        this.pipes = this.physics.add.group();
        // chama a criação de uma fileira de canos a cada 2 segundos
        this.timedEvent = this.time.addEvent({ delay: 3000, callback: this.addRowOfPipes, callbackScope: this, loop: true });

        // adiciona o pássaro no jogo
        this.plane = this.physics.add.sprite(100, 300, 'plane');
        // define gravidade para o pássaro cair
        this.plane.setGravityY(900);

        // adiciona interação mouse e tecla de espaço
        this.input.on('pointerdown', this.movePlane, this);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    movePlane() 
    {
        //Som do aviao pulando
        this.planeJumpSound.play();

        // define a velocidade da gravidade do avião a cada clique/tecla
        this.plane.setVelocity(0, -300);
    }
    addRowOfPipes() 
    {
        // sorteia um valor entre 1 e 5
        // essa posição será o buraco na fileira de canos
        var hole = Math.floor(Math.random() * 5) + 1;

        // adiciona 6 canos
        // deixando 2 espaços na posição sorteada (hole e hole + 1)
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1 && i != hole + 2)
                this.pipes.create(screen.width - 0.1, i * 60 + 30, 'curse');

        // define a velocidade da movimentação da fileira de canos
        this.pipes.setVelocityX(-500);

        // apaga a fileira de canos quando não for mais visível
        this.pipes.checkWorldBounds = true;
        this.pipes.outOfBoundsKill = true;

        // atualiza score
        this.score += 1;
        this.labelScore.setText('score: ' + this.score);
    }
    endGame() 
    {
        //Para todos os sons em loop (do aviao e da musica)
        this.planeSound1.stop();
        this.planeSound2.stop();
        this.music1Action.stop();

        // reinicia o jogo;
        this.scene.start('SceneGameOver');
    }
    update() 
    {
        // se a tecla de espaço for pressionada, movimenta o pássaro
        if (this.spaceKey.isDown)
            this.movePlane();

        // checando colisão com a fileira de canos
        this.physics.world.collide(this.plane, this.pipes, function () {
            this.endGame();
        }, null, this);

        // checando colisão com as bordas do jogo
        if (this.plane.y > game.config.height || this.plane.y < 0) {
            this.endGame();
        }
    }
}