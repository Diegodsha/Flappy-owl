import Phaser from 'phaser';
import GridTablePlugin from 'phaser3-rex-plugins/plugins/gridtable-plugin';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 800,
  height: 600,
  plugins: {
    global: [{
      key: 'rexGridTablePlugin',
      plugin: GridTablePlugin,
      start: true,
    },
    ],
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};