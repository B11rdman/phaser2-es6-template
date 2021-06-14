export class PreloadState extends Phaser.State {
  preload() {
    this.load.image("logo", "assets/phaser2.png");
  }

  create() {
    this.game.state.start("game");
  }
}
