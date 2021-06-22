import Phaser from 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    const bg = this.add.image(0, 0, 'background-night');
    bg.displayHeight = config.height;
    bg.displayWidth = config.width;
    bg.y = config.height / 2;
    bg.x = config.width / 2;

    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(280, 200, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });
    this.centerContent(this.text, 2);
    this.centerContent(this.musicText, 1);

    this.musicButton.setInteractive();

    this.musicButton.on('pointerdown',
      () => {
        this.model.musicOn = !this.model.musicOn;
        this.updateAudio();
      });

    this.menuButton = new Button(this,
      400,
      500,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title');
    this.centerContent(this.menuButton, -1);

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  }

  centerContent(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(gameObject,
      this.add.zone(config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height));
  }
}
