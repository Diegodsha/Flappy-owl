import Phaser from 'phaser';
import config from '../Config/config.js';
import {
  inputValidator,
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
    let bg = this.add.image(0,0,'background-day')
    bg.displayHeight= game.config.height
    bg.displayWidth= game.config.width
    bg.y=game.config.height/2
    bg.x=game.config.width/2

    // const totalKata = retrieveOwl();

    this.welcomeText = this.add.text(155, 100, "Welcome to Flappy owl", {
      fontSize: '44px',
      fill: '#fff',
      fontFamily: 'Sans-serif',
    });

   
const container = document.getElementById('container')
    const div = eltBuilder('div',
      { class: 'userAction', id: 'input-fields' },
      eltBuilder('input', {
        type: 'text',
        class: 'form',
        id: 'playerName',
        placeholder: 'Enter your name',
        required: true,
      }), eltBuilder('input', {
        type: 'submit',
        value: 'Sumbit',
        id: 'submit',
        class: 'submit-btn',
      }));

    const fields = this.add.dom(
      config.width/2,
      250,
      div,
    );
    container.appendChild(div)
    fields.addListener('click');

    fields.on('click', (e) => {
      const playerName = document.getElementById('playerName');
      if (e.target.matches('#submit') && inputValidator(playerName) === true) {
        // checkField(playerName, 'is-invalid');
        fields.removeListener('click');
        fields.setVisible(false);
        this.playerName = playerName.value;
        localStorage.setItem('playerName', playerName.value);
  
        this.scene.start('Title');
        // this.upload = uploadKata(this.playerName, totalKata);
        // this.upload.then((info) => {
        //   this.notice = this.add.text(200, 355, `${info.result}..`, {
        //     fontSize: '24px',
        //     fill: '#fff',
        //     fontFamily: 'sans-serif',
        //   });
        //   this.time.delayedCall(1500, this.showLeaderBoard, [], this);
        //   fields.destroy();
        // });
      } else if (e.target.matches('#submit') && inputValidator(playerName) === false) {
        playerName.classList.add('is-invalid');
      }
    });

    this.checkLocalStorage()
  }

  checkLocalStorage() {
    if (localStorage.playerName) {
        console.log('exixst');
    }
  }
}