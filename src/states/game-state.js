import { MainView } from "../objects/main-view";

export class GameState extends Phaser.State {
  constructor() {
    super();
  }
  preload() {}

  create() {
    this._mainView = new MainView();
    console.warn();
  }

  update() {}
}
