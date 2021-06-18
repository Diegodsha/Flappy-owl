import 'phaser';
 
export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  preload () {
    // add logo image
  this.logo = this.add.image(400, 150, 'bird');
  this.logo.displayWidth = game.config.width / 6;
this.logo.displayHeight = game.config.height / 7;

this.logo = this.add.image(400, 450, 'logo');
this.logo.displayWidth = game.config.width / 5;
this.logo.displayHeight = game.config.height / 8;
 
  // display progress bar
  const progressBar = this.add.graphics();
  const progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(230, 270, 320, 50);
 
  const width = this.cameras.main.width;
  const height = this.cameras.main.height;
  const loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    },
  });
  loadingText.setOrigin(0.5, 0.5);
 
  const percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    },
  });
  percentText.setOrigin(0.5, 0.5);
 
  const assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    },
  });
  assetText.setOrigin(0.5, 0.5);
 
  // update progress bar
  this.load.on('progress', function (value) {
    percentText.setText(parseInt(value * 100) + '%');
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(240, 280, 300 * value, 30);
  });
 
  // update file progress text
  this.load.on('fileprogress', function (file) {
    assetText.setText('Loading asset: ' + file.key);
  });
 
  // remove progress bar when complete
  this.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    assetText.destroy();
    this.ready();
  }.bind(this));

  this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
 
  // load assets needed in our game
  //ui
  this.load.image('blueButton1', '/src/assets/ui/blue_button02.png');
  this.load.image('blueButton2', '/src/assets/ui/blue_button03.png');
  this.load.image('checkedBox', '/src/assets/ui/blue_boxCheckmark.png');
  this.load.image('box', '/src/assets/ui/grey_box.png');
  this.load.image('gameover', '/src/assets/gameover/textGameOver.png')
  this.load.image('restart-button', '/src/assets/ui/restart-button.png')
  this.load.image('logo', '/src/assets/dshagui-logo.png')
  this.load.image('message-initial', '/src/assets/ui/message-initial.png')
  this.load.image('logo', '/src/assets/dshagui-logo.png')

  //backgrounḍ and ground
  this.load.image('background-day', '/src/assets/backgrounds/background-day.png');
  this.load.image('background-night', '/src/assets/backgrounds/background-night.png');
  this.load.spritesheet('ground', '/src/assets/platforms/ground-sprite.png', {
    frameWidth: 800,
    frameHeight: 112,
  });

//music & sounds
  this.load.audio('bgMusic', ['/src/assets/TownTheme.mp3']);

//bird
  this.load.spritesheet('bird-red', '/src/assets/hero/bird-red-sprite.png', {
    frameWidth: 34,
    frameHeight: 24,
  });
  this.load.spritesheet('bird-yellow', '/src/assets/hero/bird-yellow-sprite.png', {
    frameWidth: 34,
    frameHeight: 24,
  });
  this.load.spritesheet('bird-blue', '/src/assets/hero/bird-blue-sprite.png', {
    frameWidth: 34,
    frameHeight: 24,
  });

  // pipes and coins
  this.load.image('pipe-green-top', '/src/assets/platforms/pipe-green-top.png');
  this.load.image('pipe-green-bottom', '/src/assets/platforms/pipe-green-bottom.png');
  this.load.image('pipe-red-top', '/src/assets/platforms/pipe-red-top.png');
  this.load.image('pipe-red-bottom', '/src/assets/platforms/pipe-red-bottom.png');

  this.load.spritesheet('coin', '/src/assets/coins/coin_gold.png', {
    frameWidth: 20,
    frameHeight: 20,
  });
  
  //numbers
  this.load.image('number0', '/src/assets/ui/number0.png')
  this.load.image('number1', '/src/assets/ui/number1.png')
  this.load.image('number2', '/src/assets/ui/number2.png')
  this.load.image('number3', '/src/assets/ui/number3.png')
  this.load.image('number4', '/src/assets/ui/number4.png')
  this.load.image('number5', '/src/assets/ui/number5.png')
  this.load.image('number6', '/src/assets/ui/number6.png')
  this.load.image('number7', '/src/assets/ui/number7.png')
  this.load.image('number8', '/src/assets/ui/number8.png')
  this.load.image('number9', '/src/assets/ui/number9.png')



}

  init () {
    this.readyCount = 0;
  }
   
  ready () {
    this.scene.start('Title');
    // this.scene.start('Credits');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
  
};