var game;
window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 400,
        height: 480,
        parent: 'phaser-game',
        backgroundColor: '#71c5cf',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [SceneStart, SceneMain]//coloca as cenas que existirão no jogo, sendo a primeira a primeira cena que inicia o jogo
    };
    game = new Phaser.Game(config);
}