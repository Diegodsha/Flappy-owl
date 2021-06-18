import 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';
export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

 
  create () {
    let bg = this.add.image(0,0,'background-day')
    bg.displayHeight= game.config.height
    bg.displayWidth= game.config.width
    // bg.scaleX = bg.scaleY
    bg.y=game.config.height/2
    bg.x=game.config.width/2
   	
this.model = this.sys.game.globals.model;
// this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

 
this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
this.musicButton = this.add.image(500, 200, 'checkedBox');
this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });
this.centerContent(this.text,2)
this.centerContent(this.musicText,1)

// this.menuButton = new Button(this, 400,500,'')
 
this.soundButton = this.add.image(500, 300, 'checkedBox');
this.soundText = this.add.text(250, 290, 'Sound Enabled', { fontSize: 24 });
this.centerContent(this.soundText)
 
this.musicButton.setInteractive();
this.soundButton.setInteractive();


 
this.musicButton.on('pointerdown', function () {
this.model.musicOn = !this.model.musicOn;
this.updateAudio();
}.bind(this));
 
this.soundButton.on('pointerdown', function () {
this.model.soundOn = !this.model.soundOn;
this.updateAudio();
}.bind(this));
 

// this.menuButton = this.add.sprite(400, 500, 'blueButton1').setInteractive();
// this.menuText = this.add.text(0, 0, 'Menu', { fontSize: '32px', fill: '#fff' });
// Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

// this.menuButton.on('pointerdown', function (pointer) {
//   this.scene.start('Title');
// }.bind(this));
this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
this.centerContent(this.menuButton,-1)

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
   
    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }

   centerContent(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(
        config.width / 2,
        config.height / 2 - offset * 100,
        config.width,
        config.height
      )
    );
  }
};