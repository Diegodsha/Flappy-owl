/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';
import config from '../Config/config';
import { uploadGameData } from '../API/fetch';

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
    coin: 'coin',
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
    coin: { rotate: 'rotate-coin', stop: 'coin-stop' },
  },
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    // this.framesMoveUp;
    // this.gameOver;
    // this.gameStarted;
    // this.score;
    // this.currentPipe;
    // this.nextPipes;
    // this.gapGroup;
    // this.birdName;
    // this.bird;
    // this.pipesGroup;

    // add background
    this.bgDay = this.add
      .image(0, 0, assets.scene.background.day)
      .setInteractive();
    this.bgDay.displayHeight = config.height;
    this.bgDay.displayWidth = config.width;
    this.bgDay.y = config.height / 2;
    this.bgDay.x = config.width / 2;
    this.bgDay.on('pointerdown', this.fly, this);

    this.bgNight = this.add
      .image(0, 0, assets.scene.background.night)
      .setInteractive();
    this.bgNight.displayHeight = config.height;
    this.bgNight.displayWidth = config.width;
    this.bgNight.y = config.height / 2;
    this.bgNight.x = config.width / 2;
    this.bgNight.visible = false;
    this.bgNight.on('pointerdown', this.fly, this);

    // add game utilities
    this.gapsGroup = this.physics.add.group();
    this.pipesGroup = this.physics.add.group();
    this.scoreboardGroup = this.physics.add.staticGroup();

    // add ground
    this.ground = this.physics.add.sprite(assets.scene.width,
      600,
      assets.scene.ground);
    this.ground.setCollideWorldBounds(true);
    this.ground.setDepth(10);

    // initial
    this.messageInitial = this.add.image(assets.scene.width,
      156,
      assets.scene.messageInitial);
    this.messageInitial.setDepth(30);
    this.messageInitial.visible = false;

    // end
    this.gameOverBanner = this.add.image(config.width / 2,
      206,
      assets.scene.gameOver);
    this.gameOverBanner.setDepth(20);
    this.gameOverBanner.visible = false;

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

    // Red Bird Animations
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

    // blue Bird Animations
    this.anims.create({
      key: assets.animation.bird.blue.clapWings,
      frames: this.anims.generateFrameNumbers(assets.bird.blue, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: assets.animation.bird.blue.stop,
      frames: [
        {
          key: assets.bird.blue,
          frame: 1,
        },
      ],
      frameRate: 20,
    });

    // yellow Bird Animations
    this.anims.create({
      key: assets.animation.bird.yellow.clapWings,
      frames: this.anims.generateFrameNumbers(assets.bird.yellow, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: assets.animation.bird.yellow.stop,
      frames: [
        {
          key: assets.bird.yellow,
          frame: 1,
        },
      ],
      frameRate: 20,
    });

    // coin animation
    this.anims.create({
      key: assets.animation.coin.rotate,
      frames: this.anims.generateFrameNumbers(assets.obstacle.coin, {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: assets.animation.coin.stop,
      frames: [
        {
          key: assets.obstacle.coin,
          frame: 4,
        },
      ],
      frameRate: 20,
    });

    this.coinGroup = this.add.group({
      // once a coin is removed, it's added to the pool
      removeCallback: (coin) => {
        coin.scene.coinPool.add(coin);
      },
    });

    this.coinPool = this.add.group({
      // once a coin is removed from the pool, it's added to the active coins group
      removeCallback: (coin) => {
        coin.scene.coinGroup.add(coin);
      },
    });

    this.prepareGame(this);

    this.gameOverBanner = this.add.image(400, 100, assets.scene.gameOver);
    this.gameOverBanner.setDepth(20);
    this.gameOverBanner.visible = false;

    this.restartButton = this.add
      .image(400, 300, assets.scene.restart)
      .setInteractive();
    this.restartButton.on('pointerdown', this.restartGame, this);
    this.restartButton.setDepth(20);
    this.restartButton.visible = false;

    this.menuButton = this.add.image(400, 400, 'home-button').setInteractive();
    this.menuButton.on('pointerdown', this.goHome, this);
    this.menuButton.setDepth(20);
    this.menuButton.visible = false;

    this.scoreButton = this.add.image(400, 500, 'leaderboard').setInteractive();
    this.scoreButton.on('pointerdown', this.goScores, this);
    this.scoreButton.setDepth(20);
    this.scoreButton.visible = false;

    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    if (this.gameOver || !this.gameStarted) return;

    if (this.framesMoveUp > 0) this.framesMoveUp -= 1;
    else if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) this.fly();
    else {
      this.bird.body.allowGravity = true;
      this.bird.body.gravity.y = 1000;
      if (this.bird.angle < 90) this.bird.angle += 1;
    }

    this.pipesGroup.children.iterate((child) => {
      if (child === undefined) return;

      if (child.x < -50) child.destroy();
      else child.setVelocityX(-100);
    });

    this.gapsGroup.children.iterate((child) => {
      child.body.setVelocityX(-100);
    });

    this.coinGroup.children.iterate((child) => {
      child.body.setVelocityX(-100);
    });

    this.nextPipes += 1;
    if (this.nextPipes === 130) {
      this.makePipes(this);
      this.nextPipes = 0;
    }
  }

  collectCoin(_, coin) {
    coin.disableBody(true, true);
  }

  fly() {
    if (this.gameOver) return;

    if (!this.gameStarted) this.startGame(this);

    this.bird.setVelocityY(-350);
    this.bird.angle = -15;
    this.framesMoveUp = 5;
  }

  hitBird() {
    this.physics.pause();

    this.gameOver = true;
    this.gameStarted = false;

    this.bird.anims.play(this.getAnimationBird(this.birdName).stop);
    this.ground.anims.play(assets.animation.ground.stop);

    this.gameOverBanner.visible = true;
    this.restartButton.visible = true;
    this.menuButton.visible = true;
    this.scoreButton.visible = true;
    const playerName = localStorage.getItem('playerName');
    this.data = uploadGameData(playerName, this.score);
  }

  goHome() {
    this.scene.start('Title');
  }

  goScores() {
    this.scene.start('Scoreboard');
  }

  restartGame() {
    this.pipesGroup.clear(true, true);
    this.pipesGroup.clear(true, true);
    this.gapsGroup.clear(true, true);
    this.coinGroup.clear(true, true);
    this.scoreboardGroup.clear(true, true);
    this.bird.destroy();
    this.gameOverBanner.visible = false;
    this.restartButton.visible = false;
    this.menuButton.visible = false;

    this.prepareGame(this);
    this.physics.resume();
  }

  prepareGame(scene) {
    this.framesMoveUp = 0;
    this.nextPipes = 0;
    this.currentPipe = assets.obstacle.pipe.green;
    this.score = 0;
    this.gameOver = false;
    this.bgDay.visible = true;
    this.bgNight.visible = false;
    this.messageInitial.visible = true;

    this.birdName = this.getRandomBird();
    this.bird = this.physics.add.sprite(60, 265, this.birdName);
    this.bird.setCollideWorldBounds(true);
    this.bird.anims.play(this.getAnimationBird(this.birdName).clapWings, true);
    this.bird.body.allowGravity = false;

    this.physics.add.collider(this.bird,
      this.ground,
      this.hitBird,
      null,
      scene);
    this.physics.add.collider(this.bird,
      this.pipesGroup,
      this.hitBird,
      null,
      scene);

    this.physics.add.overlap(this.bird,
      this.gapsGroup,
      this.updateScore,
      null,
      scene);

    this.physics.add.overlap(this.bird,
      this.coinGroup,
      this.collectCoin,
      null,
      scene);

    this.ground.anims.play(assets.animation.ground.moving, true);
  }

  updateScore(_, gap) {
    this.score += 1;
    gap.destroy();

    if (this.score % 10 === 0) {
      this.bgDay.visible = !this.bgDay.visible;
      this.bgNight.visible = !this.bgNight.visible;

      if (this.currentPipe === assets.obstacle.pipe.green) {
        this.currentPipe = assets.obstacle.pipe.red;
      } else {
        this.currentPipe = assets.obstacle.pipe.green;
      }
    }

    this.updateScoreboard();
  }

  updateScoreboard() {
    this.scoreboardGroup.clear(true, true);

    const scoreAsString = this.score.toString();
    if (scoreAsString.length === 1) {
      this.scoreboardGroup
        .create(config.width / 2, 30, assets.scoreboard.base + this.score)
        .setDepth(10);
    } else {
      let initialPosition = config.width / 2 - (this.score.toString().length
      * assets.scoreboard.width) / 2;

      for (let i = 0; i < scoreAsString.length; i += 1) {
        this.scoreboardGroup
          .create(initialPosition,
            30,
            assets.scoreboard.base + scoreAsString[i])
          .setDepth(10);
        initialPosition += assets.scoreboard.width;
      }
    }
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
        return assets.animation.bird.yellow;
      case assets.bird.blue:
        return assets.animation.bird.blue;
      default:
        return assets.animation.bird.red;
    }
  }

  makePipes(scene) {
    if (!this.gameStarted || this.gameOver) return;

    const pipeTopY = Phaser.Math.Between(-120, 120);

    const gap = scene.add.line(config.width + 20, pipeTopY + 210, 0, 0, 0, 98);
    this.gapsGroup.add(gap);
    gap.body.allowGravity = false;
    gap.visible = false;

    if (this.coinPool.getLength()) {
      const coin = this.coinPool.getFirst();
      coin.x = config.width + 20;
      coin.y = pipeTopY + 210;
      coin.alpha = 1;
      coin.active = true;
      coin.visible = true;
      this.coinPool.remove(coin);
    } else {
      const coin = this.physics.add.sprite(config.width + 20,
        pipeTopY + 220,
        0,
        0,
        0,
        98,
        'coin');
      coin.setImmovable(true);
      coin.body.allowGravity = false;
      coin.anims.play(assets.animation.coin.rotate);
      coin.setDepth(2);
      this.coinGroup.add(coin);
    }

    const pipeTop = this.pipesGroup.create(config.width + 20,
      pipeTopY + 20,
      this.currentPipe.top);
    pipeTop.body.allowGravity = false;

    const pipeBottom = this.pipesGroup.create(config.width + 20,
      pipeTopY + 440,
      this.currentPipe.bottom);
    pipeBottom.body.allowGravity = false;
  }

  startGame(scene) {
    this.gameStarted = true;
    this.messageInitial.visible = false;
    this.scoreButton.visible = false;

    const score0 = this.scoreboardGroup.create(config.width / 2,
      30,
      assets.scoreboard.number0);
    score0.setDepth(20);

    this.makePipes(scene);
  }
}
