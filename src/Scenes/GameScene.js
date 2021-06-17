import 'phaser'
// import config from '../Config/config';
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  create () {

    // this.add.image(400,300,'back-sky')
    let bgGame= this.add.image(0,0,'back-sky')
    bgGame.displayHeight= game.config.height
    bgGame.displayWidth= game.config.width
    bgGame.y=game.config.height/2
    bgGame.x=game.config.width/2

    this.bird = this.physics.add.sprite(100, 250, 'bird');
    this.bird.body.gravity.y = 1000
    
    this.input.on('pointerdown', this.jump, this);
    this.input.keyboard.on('keydown-SPACE', this.jump, this);

    
  }
  
  update () {
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 10 || this.bird.y > 580)
    this.restartGame();
  }

  jump () {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
}
  restartGame () {
    this.scene.start('Game');
  }
};
