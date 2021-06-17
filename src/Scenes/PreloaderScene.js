import 'phaser';
 
export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  preload () {
    // add logo image
  this.add.image(640, 150, 'logo');
 
  // display progress bar
  const progressBar = this.add.graphics();
  const progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(500, 270, 320, 50);
 
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
    progressBar.fillRect(510, 280, 300 * value, 30);
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
  this.load.image('game-over', '/src/assets/gameover/textGameOver.png')
  this.load.image('restart', '/src/assets/ui/restart-button.png')

  //backgrounḍ and ground
  this.load.image('back-sky', '/src/assets/backgrounds/background-day.png');
  this.load.spritesheet('ground', '/src/assets/platforms/ground-sprite.png', {
    frameWidth: 20,
    frameHeight: 20,
  });

//music & sounds
  this.load.audio('bgMusic', ['/src/assets/TownTheme.mp3']);

//bird
  this.load.spritesheet('bird', '/src/assets/hero/bird-red-spriet.png', {
    frameWidth: 34,
    frameHeight: 24,
  });

  // pipes and coins
  this.load.image('pipe-up', '/src/assets/platforms/pipe-green-top.png');
  this.load.image('pipe-down', '/src/assets/platforms/pipe-green-bottom.png');

  this.load.spritesheet('coin', '/src/assets/coins/coin_gold.png', {
    frameWidth: 20,
    frameHeight: 20,
  });

 

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