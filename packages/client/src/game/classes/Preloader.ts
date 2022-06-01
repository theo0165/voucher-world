import Game from '../Game';
export class Preloader {
  static loadAssets(game: Game) {
    game.game.loader
      .add('character', '/spritesheets/character/character.json')
      .add('map', '/spritesheets/map/map.json')
      .load(() => game.startGame());
  }
}
