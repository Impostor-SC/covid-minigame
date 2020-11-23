import { Component, Host, Watch, h, State, Prop, getAssetPath } from '@stencil/core';
import {
  generateMaze,
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
  }

  recordUserKeystroke(e: any) {
    let ev = e.key || e.code;
    let moveResult: any = {};
    console.log(ev) // DEBUG
    if (ev === "ArrowUp") {
      moveResult = playerMoveUp(this.maze);
    } else if (ev === "ArrowRight") {
      moveResult = playerMoveRight(this.maze);
    } else if (ev === "ArrowLeft") {
      moveResult = playerMoveLeft(this.maze);
    } else if (ev === "ArrowDown") {
      moveResult = playerMoveDown(this.maze);
    } else if (ev === "Enter") {
      moveResult = playerShoot(this.maze);
    }

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
    this.maze = generateMaze(newValue);
  }

  icon = { 
    'P':'player.png',
    '#':'wall.png',
    'X':'enemy.png',
    'F':'finish.png',
    '.':'path.png'
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
                    <td key={idxCell}>
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
