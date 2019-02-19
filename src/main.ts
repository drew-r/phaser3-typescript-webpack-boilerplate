import 'phaser';
import { Scene } from 'phaser';
declare global {
  const process: {
    env: {
      [key: string]: string | undefined
    }
  }; 
}

export class MainScene extends Scene {
  preload() {}

  create() {}

  update() {}
}

export const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: process.env.WIDTH || 1024,
  height: process.env.HEIGHT  || 768,
  scene: [MainScene]
});
