class SceneGameOver extends Phaser.Scene {
    constructor() {
        super('SceneGameOver');
    }
    preload() {
    }
    create() {
        this.start = this.add.text(game.config.width/2,
            game.config.height/2, 'Game Over!',
            {
                fontFamily: 'courier new',
                color: '#ff1fgf',
                fontSize: '80px',
            });
        this.start.setOrigin(0.5,0.5);
        this.input.on('pointerdown', this.restartGame, this);//clica com o mouse e chama a função startGame()
    }
    restartGame() {
        // reinicia o jogo
         this.scene.start('SceneMain');//entra na cena de jogo
    }
    update() {
    }
}