import { CellScale } from "@armathai/phaser2-grid";
import { getGameBounds } from "../functions";

export function getMainGridLandscapeConfig() {
  return {
    name: "main",
    bounds: getGameBounds(),
    debug: { color: 0xffffff },
    // scale: CellScale.None,
  };
}

export function getMainGridPortraitConfig() {
  return {
    name: "main",
    bounds: getGameBounds(),
    debug: { color: 0xffffff },
    scale: CellScale.None,
  };
}
