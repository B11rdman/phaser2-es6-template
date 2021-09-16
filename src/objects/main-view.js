import { Phaser2Grid } from "@armathai/phaser2-grid";
import { getMainViewGridConfig } from "../grid-config/grid-configs";

export class MainView extends Phaser2Grid {
  constructor() {
    super(window.game);

    this._build();

    window.addEventListener("resize", () => {
      // addOverlayCommand();
      this._onResize();
    });
  }

  getGridConfig() {
    return getMainViewGridConfig();
  }

  _build() {
    super.build(this.getGridConfig());

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    const logo = this.game.add.sprite(100, 100, "logo");
    game.physics.enable(logo, Phaser.Physics.ARCADE);

    logo.body.velocity.setTo(200, 200);
    logo.body.collideWorldBounds = true;
    logo.body.bounce.set(1);

    console.warn("Phaser2 ES6 Template");
  }

  _onResize() {
    this.rebuild(this.getGridConfig());
  }
}
