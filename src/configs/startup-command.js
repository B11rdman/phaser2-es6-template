import { lego } from "@armathai/lego";
import { addOverlayCommand } from "../overlay";

export function startupCommand() {
  lego.command.execute(addOverlayCommand);
}
