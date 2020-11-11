class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        // carrega as imagens
        this.load.image('bird', 'images/bird.png');
        this.load.image('pipe', 'images/pipe.png');
    }
    create() {
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
        this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.addRowOfPipes, callbackScope: this, loop: true });

        // adiciona o pássaro no jogo
        this.bird = this.physics.add.sprite(100, 300, 'bird');
        // define gravidade para o pássaro cair
        this.bird.setGravityY(200);

        // adiciona interação mouse e tecla de espaço
        this.input.on('pointerdown', this.moveBird, this);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    moveBird() {
        // define a velocidade da gravidade do pássaro a cada clique/tecla
        this.bird.setVelocity(0, -100);
    }
    addRowOfPipes() {
        // sorteia um valor entre 1 e 5
        // essa posição será o buraco na fileira de canos
        var hole = Math.floor(Math.random() * 5) + 1;

        // adiciona 6 canos
        // deixando 2 espaços na posição sorteada (hole e hole + 1)
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.pipes.create(400, i * 60 + 30, 'pipe');

        // define a velocidade da movimentação da fileira de canos
        this.pipes.setVelocityX(-200);

        // apaga a fileira de canos quando não for mais visível
        this.pipes.checkWorldBounds = true;
        this.pipes.outOfBoundsKill = true;

        // atualiza score
        this.score += 1;
        this.labelScore.setText('score: ' + this.score);
    }
    restartGame() {
        // reinicia o jogo;
        this.scene.start('SceneMain');
    }
    update() {
        // se a tecla de espaço for pressionada, movimenta o pássaro
        if (this.spaceKey.isDown)
            this.moveBird();

        // checando colisão com a fileira de canos
        this.physics.world.collide(this.bird, this.pipes, function () {
            this.restartGame();
        }, null, this);

        // checando colisão com as bordas do jogo
        if (this.bird.y > game.config.height || this.bird.y < 0) {
            this.restartGame();
        }
    }
}