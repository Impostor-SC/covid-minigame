import { Component, Host, Watch, h, State } from '@stencil/core';
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
})
export class StaySafeGame {

  @State() level: Number = 1;
  @State() isLoading: boolean = true;
  @State() maze: Array< Array< String > > = null;

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
    document.getElementsByTagName('body')[0].removeEventListener("keyup", this.recordUserKeystroke)
  }

  @Watch('level')
  watchHandler(newValue: Number, oldValue: Number) {
    console.log("Hi " + newValue) // DEBUG
    this.maze = generateMaze(newValue);
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
                      {cell}
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
