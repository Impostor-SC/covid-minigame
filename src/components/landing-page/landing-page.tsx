import { Component, Host, h } from '@stencil/core';
@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.css',
  shadow: true,
})
export class LandingPage {
  
  startGame = () => {
    this.route = "game";
  }

  render() {
    return (
      <Host>
        <div>
          <img src="./assets/coronavirus2.png"/>
          <h1>Stay Safe!</h1>
          <button onClick={this.startGame}>Start</button>
        </div>
      </Host>
    );
  }
}
