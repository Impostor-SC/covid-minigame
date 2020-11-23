import { Component, Host, Watch, h, State, Prop, getAssetPath } from '@stencil/core';
import {
  generateMaze,
  initEnemies,
  moveAllEnemies,
  playerMoveRight,
  playerMoveLeft,
  playerMoveUp,
  playerMoveDown,
  playerShoot
} from '../../utils/utils'

@Component({
  tag: 'stay-safe-game',
  styleUrl: 'stay-safe-game.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class StaySafeGame {

  @Prop() level: number;
  @State() isLoading: boolean = true;
  @State() maze: Array< Array< string > > = null;

  componentWillLoad() {
    console.log("Hi " + this.level) // DEBUG
    this.maze = generateMaze(this.level);
    console.log(this.maze)
  }

  recordUserKeystroke(e: any) {
    let ev = e.key || e.code;
    let moveResult: any = {};
    console.log(ev) // DEBUG
    if (ev === "ArrowUp") {
      moveResult = playerMoveUp();
    } else if (ev === "ArrowRight") {
      moveResult = playerMoveRight();
    } else if (ev === "ArrowLeft") {
      moveResult = playerMoveLeft();
    } else if (ev === "ArrowDown") {
      moveResult = playerMoveDown();
    } else if (ev === "Enter") {
      moveResult = playerShoot();
    }

    console.log(moveResult)

    if (moveResult.success) {
      this.maze = moveAllEnemies(moveResult.maze);
    }
  }

  componentDidLoad() {
    document.getElementsByTagName('body')[0].addEventListener("keyup", this.recordUserKeystroke);
  }

  disconnectedCallback() {
    document.getElementsByTagName('body')[0].removeEventListener("keyup", this.recordUserKeystroke);
  }

  @Watch('level')
  watchHandler(newValue: number, oldValue: number) {
    console.log("Hi " + newValue) // DEBUG
    initEnemies()
    this.maze = generateMaze(newValue);
  }

  icon = { 
    'P':'player.png',
    'S':'sister.png',
    '#':'wall.png',
    'X':'enemy.png',
    'F':'finish.png',
    '.':'path.png',
    "-":'cover.png'
  }

  displayEntity(name) {
    return (
      <img class="icon" src={getAssetPath(`./assets/${this.icon[name[0]]}`)} />
      );
  }
  render() {
    return (
      <Host>
        <h1 class="title">Stay Safe!</h1>
        <div class="game-wrapper">
          {this.maze ?
            <table>
              {this.maze.map((row, idxRow) => (
                <tr key={idxRow}>
                  {row.map((cell, idxCell) => (
                    <td key={idxCell} style={{ backgroundImage : `url(${getAssetPath(`./assets/path.png`)})` }}>
                      {this.displayEntity(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </table>
          :
            <h2>Loading...</h2>
          }
        </div>
      </Host>
    );
  }

}
