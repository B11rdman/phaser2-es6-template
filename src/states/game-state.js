export class GameState extends Phaser.State {
  constructor() {
    super();
  }
  preload() {}

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    const logo = this.game.add.sprite(100, 100, "logo");
    game.physics.enable(logo, Phaser.Physics.ARCADE);

    logo.body.velocity.setTo(200, 200);
    logo.body.collideWorldBounds = true;
    logo.body.bounce.set(1);

    console.warn("Phaser2 ES6 Template");
  }

  update() {}
}
