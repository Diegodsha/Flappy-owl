import Phaser from 'phaser';
import bird from '../assets/ui/favicon.png';
import logo from '../assets/dshagui-logo.png';
import back from '../assets/backgrounds/background-day.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('bird', bird);
    this.load.image('logo', logo);
    this.load.image('background', back);
  }

  create() {
    this.scene.start('Preloader');
  }
}
