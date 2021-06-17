import 'phaser';
// import config from '../Config/config';
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    // this.add.image(400,300,'back-sky')
    //add background
    const bgDay = this.add.image(0, 0, 'back-sky');
    bgDay.displayHeight = game.config.height;
    bgDay.displayWidth = game.config.width;
    bgDay.y = game.config.height / 2;
    bgDay.x = game.config.width / 2;
    // backgroundDay = this.add.image(assets.scene.width, 256, assets.scene.background.day).setInteractive()
    // backgroundDay.on('pointerdown', moveBird)
    // backgroundNight = this.add.image(assets.scene.width, 256, assets.scene.background.night).setInteractive()
    // backgroundNight.visible = false
    // backgroundNight.on('pointerdown', moveBird)

    //add game utilities
    this.gapGroup = this.physics.add.group();
    this.pipeGroup = this.physics.add.group();
    this.scoreBoard = this.physics.add.staticGroup();

    //add ground
    this.ground = this.physics.add.sprite(140, 600, 'ground');
    this.ground.setCollideWorldBounds(true);
    this.ground.setDepth(10);

    //add bird
    this.bird = this.physics.add.sprite(100, 250, 'bird');
    this.bird.body.gravity.y = 1000;

    // Ground animations
    this.anims.create({
      key: 'ground-moves',
      frames: this.anims.generateFrameNumbers('ground', {
        start: 0,
        end: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.anims.create({
      key: 'ground-stop',
      frames: [
        {
          key: 'ground',
          frame: 0,
        },
      ],
      frameRate: 20,
    });

    //Bird Animations
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('bird', {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'stop',
      frames: [
        {
          key: 'bird-stop',
          frame: 1,
        },
      ],
      frameRate: 20,
    });

    //prepareGame(this)-----------------------

    //move bird with click- or spacebar
    this.input.on('pointerdown', this.jump, this);
    this.input.keyboard.on('keydown-SPACE', this.jump, this);
  }

  update() {
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 10 || this.bird.y > 580) this.restartGame();
  }

  jump() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
  }
  restartGame() {
    this.scene.start('Game');
  }
}
