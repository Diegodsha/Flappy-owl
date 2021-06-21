import 'phaser';
import Button from '../Objects/Button';
import { getGameData, createGame } from '../API/fetch';

export default class ScoreScene extends Phaser.Scene {
  constructor () {
    super('Scoreboard');
  }

 
  create () {
    let bg = this.add.image(0,0,'background-night')
    bg.displayHeight= game.config.height
    bg.displayWidth= game.config.width
    bg.y=game.config.height/2
    bg.x=game.config.width/2

      this.scoreData = getGameData()

      this.title = this.add.text(320, 30, 'Top 10 Owls', {
        fontSize: '28px',
        fill: '#fff',
        fontFamily: 'sans-serif',
      })
      
    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.scoreData.then(data => {
        const topTepnOwls = data.slice(0,10)
        const newCellObject = (scene, cell) => {
            const seed = { user: '- -', score: '- -' };
    
            const container = this.add.container(0, 0);
            // const background = scene.add.graphics().fillStyle(0x000).fillRect(2, 2, 250 - 2, 40 - 2);
            const format = { fontSize: '16px', fill: '#ffcc00', fontFamily: 'Mate SC' };
    
            const { user, score } = topTepnOwls[cell.index] !== undefined
              ? topTenOwls[cell.index]
              : seed;
    
            const rank = scene.add.text(10, 20, cell.index + 1, format);
            const name = scene.add.text(40, 20, user, format);
            const scores = scene.add.text(190, 20, score, format);
    
            container.add([ rank, name, scores]);
            return container;
          };
    
          const onCellVisible = (cell) => {
            cell.setContainer(newCellObject(this, cell));
          };
    
          const table = this.add.rexGridTable(400, 300, 250, 400, {
            cellWidth: 250,
            cellHeight: 40,
            cellsCount: 10,
            columns: 1,
            cellVisibleCallback: onCellVisible.bind(this),
          });
    
          this.table = table;
    })
  }
}