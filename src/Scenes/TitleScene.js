import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // this.add.image(400, 300, 'back');
    let bg = this.add.image(0,0,'background-day')
    bg.displayHeight= game.config.height
    bg.displayWidth= game.config.width
    // bg.scaleX = bg.scaleY
    bg.y=game.config.height/2
    bg.x=game.config.width/2
    // Game
 
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options

this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');

// Credits

this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

this.model = this.sys.game.globals.model;
if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
  this.model.bgMusicPlaying = true;
  this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
  this.bgMusic.play();
  this.sys.game.globals.bgMusic = this.bgMusic;
}
  }

  
 
}
