import Phaser from 'phaser';
import config from '../Config/config.js';
import {
//   inputValidator,
  eltBuilder,
//   retrieveOwl,
//   checkField,
} from '../helpers';
// import { uploadKata } from '../system/api.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    let bg = this.add.image(0,0,'background-night')
    bg.displayHeight= game.config.height
    bg.displayWidth= game.config.width
    bg.y=game.config.height/2
    bg.x=game.config.width/2

    // const totalKata = retrieveOwl();

    this.gameOverText = this.add.text(255, 100, "It's game over, ninja", {
      fontSize: '34px',
      fill: '#fff',
      fontFamily: 'Mate SC',
    });

    this.achievement = this.add.text(280, 155, `Your score is ${56}`, {
      fontSize: '28px',
      fill: '#fff',
      fontFamily: 'Mate SC',
    });

    

    const div = eltBuilder('div',
      { class: 'userAction', id: 'input-fields' },
      eltBuilder('input', {
        type: 'text',
        class: 'form-control mb-3',
        id: 'playerName',
        placeholder: 'Enter your name Ninja...',
        required: true,
      }), eltBuilder('input', {
        type: 'submit',
        value: 'Upload Kata',
        id: 'submit',
        class: 'btn btn-info w-100',
      }));

    const fields = this.add.dom(
      620,
      config.height * 0.6,
      div,
    );

    fields.addListener('click');

    // fields.on('click', (e) => {
    //   const playerName = document.getElementById('playerName');
    //   if (e.target.matches('#submit') && inputValidator(playerName) === true) {
    //     checkField(playerName, 'is-invalid');
    //     fields.removeListener('click');
    //     fields.setVisible(false);
    //     this.playerName = playerName.value;
    //     this.upload = uploadKata(this.playerName, totalKata);
    //     this.upload.then((info) => {
    //       this.notice = this.add.text(200, 355, `${info.result}..`, {
    //         fontSize: '24px',
    //         fill: '#fff',
    //         fontFamily: 'Mate SC',
    //       });
    //       this.time.delayedCall(1500, this.showLeaderBoard, [], this);
    //       fields.destroy();
    //     });
    //   } else if (e.target.matches('#submit') && inputValidator(playerName) === false) {
    //     playerName.classList.add('is-invalid');
    //   }
    // });
  }

  showLeaderBoard() {
    this.scene.start('Scoreboard');
  }
}