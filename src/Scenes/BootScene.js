import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('bird', '/src/assets/ui/favicon.png');
    this.load.image('logo', '/src/assets/dshagui-logo.png');
    this.load.image('background', '/src/assets/backgrounds/background-day.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
