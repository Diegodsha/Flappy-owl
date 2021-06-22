/* eslint-disable no-unused-expressions */
import Phaser from 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    const bg = this.add.image(0, 0, 'background-night');
    bg.displayHeight = config.height;
    bg.displayWidth = config.width;
    bg.y = config.height / 2;
    bg.x = config.width / 2;

    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.madeByText = this.add.text(0, 0, 'Created By: Diego Hernández', {
      fontSize: '26px',
      fill: '#fff',
    });
    this.credtisLogo = this.add.image(0, 0, 'logo');
    this.credtisLogo.displayWidth = config.width / 3;
    this.credtisLogo.displayHeight = config.height / 6;
    this.zone = this.add.zone(config.width / 2,
      config.height / 2,
      config.width,
      config.height);

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    Phaser.Display.Align.In.Center(this.credtisLogo, this.zone);

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: 50,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: () => {
        this.creditsTween.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: 300,
      ease: 'Power2',
      duration: 4000,
      delay: 1000,
      onComplete: () => {
        this.madeByTween.destroy;
      },
    });

    this.madeByLogo = this.tweens.add({
      targets: this.credtisLogo,
      y: 500,
      ease: 'Power2',
      duration: 4000,
      delay: 1000,
      onComplete: () => {
        this.madeByLogo.destroy;
        this.scene.start('Title');
      },
    });
  }
}
