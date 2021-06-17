import 'phaser';

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 600 // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

export default {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    // backgroundColor: '#f3f3f3',
};