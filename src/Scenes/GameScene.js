import 'phaser';
// import config from '../Config/config';
const assets = {
    bird: {
        red: 'bird-red',
        yellow: 'bird-yellow',
        blue: 'bird-blue'
    },
    obstacle: {
        pipe: {
            green: {
                top: 'pipe-green-top',
                bottom: 'pipe-green-bottom'
            },
            red: {
                top: 'pipe-red-top',
                bottom: 'pipe-red-bottom'
            }
        }
    },
    scene: {
        width: 144,
        background: {
            day: 'background-day',
            night: 'background-night'
        },
        ground: 'ground',
        gameOver: 'game-over',
        restart: 'restart-button',
        messageInitial: 'message-initial'
    },
    scoreboard: {
        width: 25,
        base: 'number',
        number0: 'number0',
        number1: 'number1',
        number2: 'number2',
        number3: 'number3',
        number4: 'number4',
        number5: 'number5',
        number6: 'number6',
        number7: 'number7',
        number8: 'number8',
        number9: 'number9'
    },
    animation: {
        bird: {
            red: {
                clapWings: 'red-clap-wings',
                stop: 'red-stop'
            },
            blue: {
                clapWings: 'blue-clap-wings',
                stop: 'blue-stop'
            },
            yellow: {
                clapWings: 'yellow-clap-wings',
                stop: 'yellow-stop'
            }
        },
        ground: {
            moving: 'moving-ground',
            stop: 'stop-ground'
        }
    }
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  
  create() {
    
    // this.add.image(400,300,'back-sky')
    //add background
    this.bgDay = this.add.image(0, 0, assets.scene.background.day).setInteractive();
    this.bgDay.displayHeight = game.config.height;
    this.bgDay.displayWidth = game.config.width;
    this.bgDay.y = game.config.height / 2;
    this.bgDay.x = game.config.width / 2;
    // this.bgDay.on('pointerdown', moveBird)

    // backgroundNight = this.add.image(assets.scene.width, 256, assets.scene.background.night).setInteractive()
    // backgroundNight.visible = false
    // backgroundNight.on('pointerdown', moveBird)

    //add game utilities
    this.gapGroup = this.physics.add.group();
    this.pipeGroup = this.physics.add.group();
    this.scoreBoard = this.physics.add.staticGroup();

    //add ground
    this.ground = this.physics.add.sprite(assets.scene.width, 600, assets.scene.ground);
    this.ground.setCollideWorldBounds(true);
    this.ground.setDepth(10);

    //add bird
    this.bird = this.physics.add.sprite(100, 250, assets.bird.red);
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

    this.gameOverBanner = this.add.image(400,100,'game-over')
    this.gameOverBanner.setDepth(20)
    this.gameOverBanner.visible = false

    this.restartBtn = this.add.image(400,300,'restart-btn')
    this.restartBtn.setDepth(20)
    this.restartBtn.visible = false

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

  prepareGame(scene) {
    framesMoveUp = 0
    nextPipes = 0
    currentPipe = assets.obstacle.pipe.green
    score = 0
    gameOver = false
    backgroundDay.visible = true
    backgroundNight.visible = false
    messageInitial.visible = true

    birdName = getRandomBird()
    player = scene.physics.add.sprite(60, 265, birdName)
    player.setCollideWorldBounds(true)
    player.anims.play(getAnimationBird(birdName).clapWings, true)
    player.body.allowGravity = false

    scene.physics.add.collider(player, ground, hitBird, null, scene)
    scene.physics.add.collider(player, pipesGroup, hitBird, null, scene)

    scene.physics.add.overlap(player, gapsGroup, updateScore, null, scene)

    ground.anims.play(assets.animation.ground.moving, true)
}
}
