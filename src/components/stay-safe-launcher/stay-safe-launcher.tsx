import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'stay-safe-launcher',
  styleUrl: 'stay-safe-launcher.css',
  shadow: true,
})
export class StaySafeLauncher {

  @State() level: number = 1;
  @State() route: string = "menu";
  @State() highestLevel: number = 1

  componentWillLoad() {
    const savedLevel = localStorage.getItem("Stay Safe Highest Level")
    if (savedLevel) {
      this.highestLevel = Number(savedLevel)
    }
  }

  startGame = () => {
    this.route = "game";
  }

  winLevel = () => {
    this.route = "winscreen";
    this.level += 1;
    this.highestLevel = Math.max(this.highestLevel, this.level)
    localStorage.setItem("Stay Safe Highest Level", String(this.highestLevel))
  }

  loseLevel = () => {
    this.route = "losescreen";
  }

  render() {
    return (
      <Host>
        {this.route === "menu" ?
          <landing-page startGame={this.startGame} highestLevel={this.highestLevel}></landing-page>
        : this.route === "winscreen" ?
          <div style={{ textAlign: "center", minHeight: "75vh", paddingTop: "15px" }}>
            <h2>You Win</h2>
            <button onClick={this.startGame} style={{ backgroundColor: "#f2e7e7", color: "#795555", borderRadius: "18px", border: "none", padding: "8px 20px", cursor: "pointer" }}>Continue</button>
          </div>
        : this.route === "losescreen" ?
          <div style={{ textAlign: "center", minHeight: "75vh", paddingTop: "15px" }}>
            <h2>You Lose</h2>
            <button onClick={this.startGame} style={{ backgroundColor: "#f2e7e7", color: "#795555", borderRadius: "18px", border: "none", padding: "8px 20px", cursor: "pointer" }}>Retry</button>
          </div>
        :
          <stay-safe-game level={this.level} winEvent={this.winLevel} loseEvent={this.loseLevel} />
        }
      </Host>
    );
  }

}