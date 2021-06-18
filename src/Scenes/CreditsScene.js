import 'phaser';
import config from '../Config/config';
 
export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }
 
  create () {
    let bg = this.add.image(0,0,'background-night')
    bg.displayHeight= game.config.height
    bg.displayWidth= game.config.width
    bg.y=game.config.height/2
    bg.x=game.config.width/2

this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
this.madeByText = this.add.text(0, 0, 'Created By: Diego Hernández', { fontSize: '26px', fill: '#fff' });
this.credtisLogo = this.add.image(0,0,'logo')
this.credtisLogo.displayWidth = game.config.width / 3;
this.credtisLogo.displayHeight = game.config.height / 6;
this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);


Phaser.Display.Align.In.Center(
  this.creditsText,
  this.zone
);

Phaser.Display.Align.In.Center(
  this.madeByText,
  this.zone
);

Phaser.Display.Align.In.Center(
  this.credtisLogo,
  this.zone
);

this.madeByText.setY(1000);

this.creditsTween = this.tweens.add({
  targets: this.creditsText,
  y: 50,
  ease: 'Power1',
  duration: 3000,
  delay: 1000,
  onComplete: function () {
    this.destroy;
  }
});
 
this.madeByTween = this.tweens.add({
  targets: this.madeByText,
  y: 300,
  ease: 'Power2',
  duration: 4000,
  delay: 1000,
  onComplete: function () {
    this.madeByTween.destroy;
  }.bind(this)
});

this.madeByLogo = this.tweens.add({
  targets: this.credtisLogo,
  y: 500,
  ease: 'Power2',
  duration: 4000,
  delay: 1000,
  onComplete: function () {
    this.madeByLogo.destroy;
    this.scene.start('Title');
  }.bind(this)
});
  }
};