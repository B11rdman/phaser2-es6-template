export function LP(arg1, arg2) {
  const { width, height } = window.game;
  return width >= height ? arg1 : arg2;
}

export const getGameBounds = () => {
  const { width, height } = window.game;

  return new Phaser.Rectangle(0, 0, width, height);
};
