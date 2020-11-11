class SceneStart extends Phaser.Scene {
    constructor() {
        super('SceneStart');
    }
    preload() {
    }
    create() {
        this.start = this.add.text(game.config.width/2,
            game.config.height/2, 'Start',
            {
                fontFamily: 'courier new',
                color: '#ffffff',
                fontSize: '30px'
            });
        this.start.setOrigin(0.5,0.5);
        this.input.on('pointerdown', this.startGame, this);//clica com o mouse e chama a função startGame()
    }
    startGame() {
        // reinicia o jogo
         this.scene.start('SceneMain');//entra na cena de jogo
    }
    update() {
    }
}