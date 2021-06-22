import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const bg = this.add.image(0, 0, 'background-day');
    bg.displayHeight = config.height;
    bg.displayWidth = config.width;
    bg.y = config.height / 2;
    bg.x = config.width / 2;
    // Game

    this.gameButton = new Button(this,
      config.width / 2,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game');

    // Scoreboard
    this.scoreButton = new Button(this,
      700,
      500,
      'leaderboard',
      'leaderboard',
      '',
      'Scoreboard');

    // Options

    this.optionsButton = new Button(this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options');

    // Credits

    this.creditsButton = new Button(this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.model.bgMusicPlaying = true;
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
