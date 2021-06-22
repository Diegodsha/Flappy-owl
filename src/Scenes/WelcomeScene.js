import Phaser from 'phaser';
import config from '../Config/config';
import { inputValidator, eltBuilder } from '../helpers';

export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('Welcome');
  }

  create() {
    const bg = this.add.image(0, 0, 'background-day');
    bg.displayHeight = config.height;
    bg.displayWidth = config.width;
    bg.y = config.height / 2;
    bg.x = config.width / 2;

    this.welcomeText = this.add.text(155, 100, 'Welcome to Flappy owl', {
      fontSize: '44px',
      fill: '#fff',
      fontFamily: 'Sans-serif',
    });

    const container = document.getElementById('container');
    const div = eltBuilder('div',
      { class: 'userAction', id: 'input-fields' }, eltBuilder('input', {
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

    const fields = this.add.dom(config.width / 2 + 150, 250, div);
    container.appendChild(div);
    fields.addListener('click');

    fields.on('click', (e) => {
      const playerName = document.getElementById('playerName');
      if (e.target.matches('#submit') && inputValidator(playerName) === true) {
        fields.removeListener('click');
        fields.setVisible(false);
        this.playerName = playerName.value;
        localStorage.setItem('playerName', playerName.value);

        this.scene.start('Title');
      } else if (
        e.target.matches('#submit') && inputValidator(playerName) === false
      ) {
        playerName.classList.add('is-invalid');
      }
    });
  }
}
