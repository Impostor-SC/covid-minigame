import { Component, Host, h, State, Prop, getAssetPath } from '@stencil/core';
import {
  generateMaze,
  moveAllEnemies,
  playerMoveRight,
  playerMoveLeft,
  playerMoveUp,
  playerMoveDown,
  playerShootLeft,
  playerShootRight,
  playerShootUp,
  playerShootDown,
  numberOfEnemies
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
  @State() ammo: number = 0;
  @State() sisterSaved: boolean = false;
  @Prop() winEvent: Function;
  @Prop() loseEvent: Function;
  @State() isLoading: boolean = true;
  @State() maze: Array< Array< string > > = null;

  componentWillLoad() {
    console.log("ComponentWillLoad()")
    this.maze = generateMaze(this.level);
    this.ammo = numberOfEnemies
    console.log(this.maze)
  }

  recordUserKeystroke = (e: any) => {
    if (this.status !== 0) return
    this.status = 1

    let ev = e.key || e.code;
    let moveResult: any = {};
    
    // Check for Ammo
    if (ev === "i" || ev === "j" || ev === "k" || ev === "l") {
      if (this.ammo <= 0) {
        this.gameInfo = "You are out of soap"
        this.status = 0
        return
      }
      this.ammo -= 1
    }

    // Check for movement or shoot
    if (ev === "w") {
      moveResult = playerMoveUp();
    } else if (ev === "d") {
      moveResult = playerMoveRight();
    } else if (ev === "a") {
      moveResult = playerMoveLeft();
    } else if (ev === "s") {
      moveResult = playerMoveDown();
    } else if (ev === "i") {
      moveResult = playerShootUp();
    } else if (ev === "j") {
      moveResult = playerShootLeft();
    } else if (ev === "k") {
      moveResult = playerShootDown();
    } else if (ev === "l") {
      moveResult = playerShootRight();
    } else if (ev === " ") {
      moveResult = {
        success: 1,
        maze: this.maze
      }
    } else {
      this.status = 0
      return
    }

    // Get result from the main algorithm
    if (moveResult.success > 0) {
      if (moveResult.success === 2) {
        this.sisterSaved = true
        this.gameInfo = "You found your sister. Enemy's turn"
      } else if (moveResult.success === 3) {
        if (this.sisterSaved) {
          this.maze = moveResult.maze
          this.winEvent()
        } else {
          this.gameInfo = "You need to find your sister first"
          this.status = 0
          return
        }
      } else if (moveResult.success === 11) {
        this.gameInfo = "You missed. Enemy's turn"
      } else if (moveResult.success === 12) {
        this.gameInfo = "You hit an enemy. Enemy's turn"
      } else {
        this.gameInfo = "Enemy's turn"
      }
      this.maze = moveResult.maze
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
          <h3>Level: {this.level}, Health: {this.health}, Soap: {this.ammo}, Sister: {this.sisterSaved ? "Saved" : "-"}</h3>
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
