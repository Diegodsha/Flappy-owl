import Phaser from 'phaser';
import Button from '../Objects/Button';
import { getGameData } from '../API/fetch';
import config from '../Config/config';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Scoreboard');
  }

  create() {
    const bg = this.add.image(0, 0, 'background-night');
    bg.displayHeight = config.height;
    bg.displayWidth = config.width;
    bg.y = config.height / 2;
    bg.x = config.width / 2;

    this.scoreData = getGameData();

    this.title = this.add.text(320, 30, 'Top 10 Owls', {
      fontSize: '28px',
      fill: '#fff',
      fontFamily: 'Sans-serif',
    });

    this.menuButton = new Button(this,
      400,
      550,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title');

    this.scoreData.then((data) => {
      const topTenOwls = data.slice(0, 11);

      const newCellObject = (scene, cell) => {
        const seed = { user: '- -', score: '- -' };

        const container = this.add.container(0, 0);
        const format = {
          fontSize: '16px',
          fill: '#fff',
          fontFamily: 'Sans-serif',
        };

        const { user, score } = topTenOwls[cell.index] !== undefined
          ? topTenOwls[cell.index] : seed;

        const rank = scene.add.text(10, 20, cell.index + 1, format);
        const name = scene.add.text(40, 20, user, format);
        const scores = scene.add.text(190, 20, score, format);

        container.add([rank, name, scores]);
        return container;
      };

      const onCellVisible = (cell) => {
        cell.setContainer(newCellObject(this, cell));
      };

      this.table = this.add.rexGridTable(400, 300, 250, 400, {
        cellWidth: 250,
        cellHeight: 40,
        cellsCount: 10,
        columns: 1,
        cellVisibleCallback: onCellVisible.bind(this),
      });
    });
  }
}
