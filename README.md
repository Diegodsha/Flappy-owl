# Flappy owl Game

A Phaser 3 Game 

<p align="center">
  <a href="https://github.com/Diegodsha/Flappy-owl/issues">
  <img src="https://img.shields.io/github/issues-raw/Diegodsha/Flappy-owl?style=for-the-badge"
       alt="Issues"></a>
   <a href="https://github.com/Diegodsha/Flappy-owl/pulls">
  <img src="https://img.shields.io/github/issues-pr/Diegodsha/Flappy-owl?style=for-the-badge"
       alt="Pull Requests"></a>
   <a href="https://github.com/Diegodsha/Flappy-owl/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/Diegodsha/Flappy-owl?style=for-the-badge"
       alt="License"></a>
</p>

## Preview

![playOwl](https://user-images.githubusercontent.com/70416006/122822202-615e3c00-d2a3-11eb-9e53-15cf693b75ac.png)

## Built With

- HTML5
- CSS
- Phaser 3
- Javascript (ES6)
- Webpack 5
- Microverse game API

### Description

    Game inspired by the fun and famous mobile game Flappy bird.

## Live Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/08942cd1-5255-4122-a2c1-32302e7ef22f/deploy-status)](https://app.netlify.com/sites/flappy-owl/deploys)

Visit [Flappy-owl](https://flappy-owl.netlify.app/)

## Prerequisites
  - Internet Connection
  - Web Browser
  - Screen size medium to large (Tablet on landscape, or PC)
  - Code Editor 
  - Node Package Manager (NPM)


## Getting Started

- Open your terminal - Windows: `Win + R`, then type `cmd` | Mac: `Command + space`, then type `Terminal`| Linux: `Ctrl + Alt + t`
- Navigate to a directory of your choosing using the `cd` command (e.g: cd my-directory/)
- Run this command in your OS terminal: `git clone https://github.com/Diegodsha/Flappy-owl` to get a copy of the project.
- Navigate to the project's directory using the `cd` command

## Usage

From within the project directory run `npm i` then `npm build` open the `index.html` file within dist folder on your web browser
or after running `npm i` to install all dependencies run `npm start` to start a local server.


## Testing (JEST)

A script for testing was added, so the user can simply run `npm test` from within the project's folder to execute all the tests.

## Game Design

    You're an owl and your main goal is to collect as many coins as possible while you try to avoid a collision with any object
    to be part of the top ten best coin collectors, the coins appear between a gap that exists every time a top and bottom pipes appears,
    every time you collide with an object or fall down the game will finish and your score will be submitted against the other players
    try to beat the rank #1 owl and invite your friends to play.

    Every time you restart the game your owls color will change, there are 3 options (red, blue, yellow)


### Main Characters
![bird-blue-sprite](https://user-images.githubusercontent.com/70416006/122995502-51ac2980-d36f-11eb-8432-e1279e88e4e3.png)
![bird-red-sprite](https://user-images.githubusercontent.com/70416006/122995506-5244c000-d36f-11eb-839a-50a77947368a.png)
![bird-yellow-sprite](https://user-images.githubusercontent.com/70416006/122995507-5244c000-d36f-11eb-8f1a-555880012379.png)

### Obstacles and collision objects
![ground-sprite](https://user-images.githubusercontent.com/70416006/122995599-6ab4da80-d36f-11eb-8da6-bc8ffa76b987.png)
![pipe-green-bottom](https://user-images.githubusercontent.com/70416006/122995601-6b4d7100-d36f-11eb-885c-c1f692b7cd98.png)
![pipe-green-top](https://user-images.githubusercontent.com/70416006/122995602-6b4d7100-d36f-11eb-8f6c-36f29bcb52d3.png)
![pipe-red-bottom](https://user-images.githubusercontent.com/70416006/122995606-6be60780-d36f-11eb-806a-49e66dced95a.png)
![pipe-red-top](https://user-images.githubusercontent.com/70416006/122995608-6be60780-d36f-11eb-9fc3-a1b1e7bf45f4.png)

### Collectables
![coin_gold](https://user-images.githubusercontent.com/70416006/122995673-83bd8b80-d36f-11eb-8338-74de1ecbc01f.png)

### Loading Scene

![loadingOwl](https://user-images.githubusercontent.com/70416006/122822200-60c5a580-d2a3-11eb-937d-bbe23ce7ec9f.png)

### Title Scene

![titleOwl](https://user-images.githubusercontent.com/70416006/122821934-0f1d1b00-d2a3-11eb-8352-8dead4136ac9.png)

### Game navigation options
### Play

![startOwl](https://user-images.githubusercontent.com/70416006/122821915-09bfd080-d2a3-11eb-8a6d-e547f55bdb05.png)

- Starts the game scene

#### Movement

![playOwl](https://user-images.githubusercontent.com/70416006/122822202-615e3c00-d2a3-11eb-9e53-15cf693b75ac.png)

- Press click or SPACEBAR and the owl will fly
- Try to collect as many coins as possible without falling or hiting any object
- Owl will start to fall down after every click or key press

#### Game over scene

![gameOverOwl](https://user-images.githubusercontent.com/70416006/122821910-088ea380-d2a3-11eb-92da-45b850049024.png)

- When the owl hits ceiling, floor, or any pipe the game will be over and you could choose between 3 options to navigate


### Options

![optionsOwl](https://user-images.githubusercontent.com/70416006/122830171-953e5f00-d2ad-11eb-8391-630ed2d62d47.png)

- Redirects to the options menu to enable disable the music

### Leaderboard

![scoreOwl](https://user-images.githubusercontent.com/70416006/122830169-953e5f00-d2ad-11eb-92b9-4b97a566ced8.png)

- Displays top ten best scores
### Credits

![creditsOwl](https://user-images.githubusercontent.com/70416006/122822201-615e3c00-d2a3-11eb-8921-603878542ba4.png)

- Show the creator credits



## Author
<div align="center">
<img src="https://user-images.githubusercontent.com/70416006/121233844-aff9e800-c858-11eb-99e4-d36b833d3fa9.png">
</div>
<div align="center">
<img src="https://user-images.githubusercontent.com/70416006/121235243-42e75200-c85a-11eb-967d-ea05dd5efe1f.png">
</div>

👤 &nbsp; **Diego Hernández**
- Portfolio: [Portfolio](https://dshagui.com/)
- LinkedIn: [diegoshdezaguilar](https://www.linkedin.com/in/diegoshdezaguilar/)
- GitHub: [@Diegodsha](https://github.com/Diegodsha)
- Twitter: [@diegohdezchimo](https://twitter.com/diegohdezchimo)

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

Microverse