import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'stay-safe-launcher',
  styleUrl: 'stay-safe-launcher.css',
  shadow: true,
})
export class StaySafeLauncher {

  @State() level: number = 1;
  @State() route: string = "menu";

  startGame = () => {
    this.route = "game";
  }

  winLevel = () => {
    this.route = "winscreen";
    this.level += 1;
  }

  loseLevel = () => {
    this.route = "losescreen";
  }

  render() {
    return (
      <Host>
        {this.route === "menu" ?
          <div style={{ textAlign: "center" }}>
            <h1>Hello</h1>
            <button onClick={this.startGame}>Start</button>
          </div>
        : this.route === "winscreen" ?
          <h2>You Win</h2>
        : this.route === "losescreen" ?
          <h2>You Lose</h2>
        :
          <stay-safe-game level={this.level} />
        }
      </Host>
    );
  }

}
