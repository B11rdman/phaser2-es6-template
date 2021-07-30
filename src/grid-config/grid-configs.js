import { LP } from "../functions";
import { getMainGridLandscapeConfig, getMainGridPortraitConfig } from "./main-view-grid-config";

export function getMainViewGridConfig() {
  return LP(getMainGridLandscapeConfig, getMainGridPortraitConfig).call(null);
}
