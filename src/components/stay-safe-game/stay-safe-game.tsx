import { Component, Host, h, State, Prop, getAssetPath } from '@stencil/core';
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
  @State() status: number = 0;
  @State() gameInfo: string = "Your turn"
  @State() health: number = 3;
  @State() sisterSaved: boolean = false;
  @Prop() winEvent: Function;
  @Prop() loseEvent: Function;
  @State() isLoading: boolean = true;
  @State() maze: Array< Array< string > > = null;

  componentWillLoad() {
    console.log("Hi " + this.level) // DEBUG
    this.maze = generateMaze(this.level);
    console.log(this.maze)
    console.log("HEYYYY")
  }

  recordUserKeystroke = (e: any) => {
    if (this.status !== 0) return
    this.status = 1

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
    } else if (ev === " ") {
      moveResult = {
        success: 1,
        maze: this.maze
      }
    } else {
      this.status = 0
      return
    }

    if (moveResult.success > 0) {
      if (moveResult.success === 2) {
        this.sisterSaved = true
        this.maze = moveResult.maze
      } else if (moveResult.success === 3) {
        if (this.sisterSaved) {
          this.maze = moveResult.maze
          this.winEvent()
        } else {
          this.gameInfo = "You need to find your sister first"
          this.status = 0
          return
        }
      } else {
        this.maze = moveResult.maze
      }
      this.gameInfo = "Enemy's turn"
      this.status = 2
      setTimeout(() => {
        const moveResult = moveAllEnemies()
        let moveTimeout = 100
        if (moveResult.health < this.health) {
          this.health = moveResult.health
          this.gameInfo = "You are attacked"
          moveTimeout = 1000
        }
        this.maze = moveResult.maze
        setTimeout(() => {
          if (this.health <= 0) {
            this.loseEvent()
          }
          this.gameInfo = "Your turn"
          this.status = 0
        }, moveTimeout)
      }, 1000)
    } else {
      this.gameInfo = "You can't go there"
      this.status = 0
    }
  }

  componentDidLoad() {
    document.getElementsByTagName('body')[0].addEventListener("keyup", this.recordUserKeystroke);
  }

  disconnectedCallback() {
    document.getElementsByTagName('body')[0].removeEventListener("keyup", this.recordUserKeystroke);
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
    console.log(this.maze)
    return (
      <Host>
        <div class="title">
          <h1>Stay Safe!</h1>
          <h3>Level: {this.level}, Health: {this.health}, Sister: {this.sisterSaved ? "Saved" : "-"}</h3>
        </div>
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
        <h3 class="game-info">{this.gameInfo}</h3>
      </Host>
    );
  }

}
