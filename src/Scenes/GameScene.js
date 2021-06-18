import 'phaser';
import config from '../Config/config';

const assets = {
  bird: {
    red: 'bird-red',
    yellow: 'bird-yellow',
    blue: 'bird-blue',
  },
  obstacle: {
    pipe: {
      green: {
        top: 'pipe-green-top',
        bottom: 'pipe-green-bottom',
      },
      red: {
        top: 'pipe-red-top',
        bottom: 'pipe-red-bottom',
      },
    },
  },
  scene: {
    width: 144,
    background: {
      day: 'background-day',
      night: 'background-night',
    },
    ground: 'ground',
    gameOver: 'game-over',
    restart: 'restart-button',
    messageInitial: 'message-initial',
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
    number9: 'number9',
  },
  animation: {
    bird: {
      red: {
        clapWings: 'red-clap-wings',
        stop: 'red-stop',
      },
      blue: {
        clapWings: 'blue-clap-wings',
        stop: 'blue-stop',
      },
      yellow: {
        clapWings: 'yellow-clap-wings',
        stop: 'yellow-stop',
      },
    },
    ground: {
      moving: 'moving-ground',
      stop: 'stop-ground',
    },
  },
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.framesMoveUp;
    this.gameOver;
    this.gameStarted;
    this.score;
    this.currentPipe;
    this.nextPipes;
    this.gapGroup;
    this.birdName;

    //add background
    this.bgDay = this.add
      .image(0, 0, assets.scene.background.day)
      .setInteractive();
    this.bgDay.displayHeight = game.config.height;
    this.bgDay.displayWidth = game.config.width;
    this.bgDay.y = game.config.height / 2;
    this.bgDay.x = game.config.width / 2;
    this.bgDay.on('pointerdown', this.fly, this);

    this.bgNight = this.add
      .image(0, 0, assets.scene.background.night)
      .setInteractive();
    this.bgNight.displayHeight = game.config.height;
    this.bgNight.displayWidth = game.config.width;
    this.bgNight.y = game.config.height / 2;
    this.bgNight.x = game.config.width / 2;
    this.bgNight.visible = false;
    // this.bgDay.on('pointerdown', moveBird)

    //add game utilities
    this.gapsGroup = this.physics.add.group();
    this.pipesGroup = this.physics.add.group();
    this.scoreboardGroup = this.physics.add.staticGroup();

    //add ground
    this.ground = this.physics.add.sprite(
      assets.scene.width,
      600,
      assets.scene.ground
    );
    this.ground.setCollideWorldBounds(true);
    this.ground.setDepth(10);

    //add bird
    this.bird = this.physics.add.sprite(100, 250, assets.bird.red);
    this.bird.body.gravity.y = 1000;

    //initial
    this.messageInitial = this.add.image(
      assets.scene.width,
      156,
      assets.scene.messageInitial
    );
    this.messageInitial.setDepth(30);
    this.messageInitial.visible = false;

    // Ground animations
    this.anims.create({
      key: assets.animation.ground.moving,
      frames: this.anims.generateFrameNumbers(assets.scene.ground, {
        start: 0,
        end: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: assets.animation.ground.stop,
      frames: [
        {
          key: assets.scene.ground,
          frame: 0,
        },
      ],
      frameRate: 20,
    });

    //Red Bird Animations
    this.anims.create({
      key: assets.animation.bird.red.clapWings,
      frames: this.anims.generateFrameNumbers(assets.bird.red, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: assets.animation.bird.red.stop,
      frames: [
        {
          key: assets.bird.red,
          frame: 1,
        },
      ],
      frameRate: 20,
    });

    //prepareGame(this)-----------------------

    this.gameOverBanner = this.add.image(400, 100, 'game-over');
    this.gameOverBanner.setDepth(20);
    this.gameOverBanner.visible = false;

    this.restartButton = this.add.image(400, 300, 'restart-btn');
    this.restartButton.setDepth(20);
    this.restartButton.visible = false;

    //move bird with click- or spacebar
    // this.input.on('pointerdown', this.jump, this);
    // this.input.keyboard.on('keydown-SPACE', this.jump, this);
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

  fly() {
    if (this.gameOver) return;

    if (!this.gameStarted) this.startGame(this);

    this.bird.setVelocityY(-350);
    // this.bird.body.velocity.y = -350;
    this.bird.angle = -15;
    this.framesMoveUp = 5;
  }

  restartGame() {
    this.scene.start('Game');
  }

  getRandomBird() {
    switch (Phaser.Math.Between(0, 2)) {
      case 0:
        return assets.bird.yellow;
      case 1:
        return assets.bird.blue;
      case 2:
      default:
        return assets.bird.red;
    }
  }

  getAnimationBird(birdColor) {
    switch (birdColor) {
        case assets.bird.yellow:
          return assets.animation.bird.yellow
          case assets.bird.blue:
            return assets.animation.bird.blue
            case assets.bird.yellow:
              default:
          return assets.animation.bird.red
    }
}

  makePipes(scene) {
    if (!this.gameStarted || this.gameOver) return;

    const pipeTopY = Phaser.Math.Between(-120, 120);

    const gap = scene.add.line(288, pipeTopY + 210, 0, 0, 0, 98);
    this.gapsGroup.add(gap);
    gap.body.allowGravity = false;
    gap.visible = false;

    const pipeTop = this.pipesGroup.create(288, pipeTopY, this.currentPipe.top);
    pipeTop.body.allowGravity = false;

    const pipeBottom = this.pipesGroup.create(
      288,
      pipeTopY + 420,
      this.currentPipe.bottom
    );
    pipeBottom.body.allowGravity = false;
  }

  prepareGame(scene) {
    framesMoveUp = 0;
    nextPipes = 0;
    currentPipe = assets.obstacle.pipe.green;
    score = 0;
    gameOver = false;
    backgroundDay.visible = true;
    backgroundNight.visible = false;
    messageInitial.visible = true;

    birdName = getRandomBird();
    player = scene.physics.add.sprite(60, 265, birdName);
    player.setCollideWorldBounds(true);
    player.anims.play(getAnimationBird(birdName).clapWings, true);
    player.body.allowGravity = false;

    scene.physics.add.collider(player, ground, hitBird, null, scene);
    scene.physics.add.collider(player, pipesGroup, hitBird, null, scene);

    scene.physics.add.overlap(player, gapsGroup, updateScore, null, scene);

    ground.anims.play(assets.animation.ground.moving, true);
  }

  startGame(scene) {
    this.gameStarted = true;
    this.messageInitial.visible = false;

    const score0 = this.scoreboardGroup.create(
      config.width / 2,
      30,
      assets.scoreboard.number0
    );
    score0.setDepth(20);

    this.makePipes(scene);
  }
}
