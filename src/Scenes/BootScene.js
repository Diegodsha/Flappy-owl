import 'phaser'

export default class BootScene extends Phaser.Scene{
    constructor(){
        super('Boot')
    }

    preload(){
        this.load.image('bird', '/src/assets/ui/favicon.png')
        this.load.image('logo', '/src/assets/dshagui-logo.png')
    }

    create(){
        this.scene.start('Preloader')
    }
}