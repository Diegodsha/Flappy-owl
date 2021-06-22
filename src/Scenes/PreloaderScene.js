import Phaser from 'phaser';
import config from '../Config/config';
import bluebtn1 from '../assets/ui/blue_button02.png';
import bluebtn2 from '../assets/ui/blue_button03.png';
import boxChekMark from '../assets/ui/blue_boxCheckmark.png';
import boxEmpty from '../assets/ui/grey_box.png';
import gameOver from '../assets/gameover/textGameOver.png';
import restartBtn from '../assets/ui/restart-button.png';
import homeBtn from '../assets/ui/home.png';
import leaderboard from '../assets/ui/leaderboard.png';
import leaderbord2 from '../assets/ui/leaderboard2.png';
import logo from '../assets/dshagui-logo.png';
import messageInitial from '../assets/ui/message-initial.png';
import musicTheme from '../assets/TownTheme.mp3';
import backDay from '../assets/backgrounds/background-day.png';
import backNight from '../assets/backgrounds/background-night.png';
import ground from '../assets/platforms/ground-sprite.png';
import redBird from '../assets/hero/bird-red-sprite.png';
import blueBird from '../assets/hero/bird-blue-sprite.png';
import yelloBird from '../assets/hero/bird-yellow-sprite.png';
import redPipeBot from '../assets/platforms/pipe-red-bottom.png';
import redPipeTop from '../assets/platforms/pipe-red-top.png';
import greenPipeBot from '../assets/platforms/pipe-green-bottom.png';
import greenPipeTop from '../assets/platforms/pipe-green-top.png';
import coin from '../assets/coins/coin_gold.png';
import number0 from '../assets/ui/number0.png';
import number1 from '../assets/ui/number1.png';
import number2 from '../assets/ui/number2.png';
import number3 from '../assets/ui/number3.png';
import number4 from '../assets/ui/number4.png';
import number5 from '../assets/ui/number5.png';
import number6 from '../assets/ui/number6.png';
import number7 from '../assets/ui/number7.png';
import number8 from '../assets/ui/number8.png';
import number9 from '../assets/ui/number9.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // background
    const bg = this.add.image(0, 0, 'background');
    bg.displayHeight = config.height;
    bg.displayWidth = config.width;
    bg.y = config.height / 2;
    bg.x = config.width / 2;
    // add logo image
    this.logo = this.add.image(400, 150, 'bird');
    this.logo.displayWidth = config.width / 6;
    this.logo.displayHeight = config.height / 7;

    this.logo = this.add.image(400, 450, 'logo');
    this.logo.displayWidth = config.width / 5;
    this.logo.displayHeight = config.height / 8;

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(230, 270, 320, 50);

    const width = 800;
    const height = 600;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)} %`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(240, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete',
      () => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    // ui
    this.load.image('blueButton1', bluebtn1);
    this.load.image('blueButton2', bluebtn2);
    this.load.image('checkedBox', boxChekMark);
    this.load.image('box', boxEmpty);
    this.load.image('game-over', gameOver);
    this.load.image('restart-button', restartBtn);
    this.load.image('home-button', homeBtn);
    this.load.image('leaderboard', leaderboard);
    this.load.image('leaderboard2', leaderbord2, {
      width: 100,
    });
    this.load.image('logo', logo);
    this.load.image('message-initial', messageInitial);

    // backgrounḍ and ground
    this.load.image(
      'background-day',
      backDay,
    );
    this.load.image(
      'background-night',
      backNight,
    );
    this.load.spritesheet('ground', ground, {
      frameWidth: 800,
      frameHeight: 112,
    });

    // music & sounds
    this.load.audio('bgMusic', [musicTheme]);

    // bird
    this.load.spritesheet('bird-red', redBird, {
      frameWidth: 34,
      frameHeight: 24,
    });
    this.load.spritesheet(
      'bird-yellow',
      yelloBird,
      {
        frameWidth: 34,
        frameHeight: 24,
      },
    );

    this.load.spritesheet(
      'bird-blue',
      blueBird,
      {
        frameWidth: 34,
        frameHeight: 24,
      },
    );

    // pipes and coins
    this.load.image('pipe-green-top',
      greenPipeTop);

    this.load.image('pipe-green-bottom',
      greenPipeBot);

    this.load.image('pipe-red-top', redPipeTop);
    this.load.image('pipe-red-bottom',
      redPipeBot);

    this.load.spritesheet('coin', coin, {
      frameWidth: 20,
      frameHeight: 20,
    });

    // numbers
    this.load.image('number0', number0);
    this.load.image('number1', number1);
    this.load.image('number2', number2);
    this.load.image('number3', number3);
    this.load.image('number4', number4);
    this.load.image('number5', number5);
    this.load.image('number6', number6);
    this.load.image('number7', number7);
    this.load.image('number8', number8);
    this.load.image('number9', number9);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Welcome');
    // this.scene.start('Credits');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Welcome');
    }
  }
}
