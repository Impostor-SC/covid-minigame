import { Component, Host, h, State, getAssetPath } from '@stencil/core';
@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class LandingPage {
  @State() route: string = "menu";

  startGame = () => {
    this.route = "game";
  }

  render() {
    return (
      <Host>
        <div>
          <div class="row">
            <img class="img" src={getAssetPath(`./assets/coronavirus2.png`)} />
            <div class="sub-start">
              <h1>Stay Safe!</h1>
              <button class="start-btn" onClick={this.startGame}>Start</button>
            </div>
          </div>

          <div class="row">
            <div class="text-box">
              <div class="text">
                <h2 class="text-center">How To Play</h2>
                <p>
                  1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu varius lorem. Vivamus mattis turpis ut justo congue, at dictum diam maximus. Aenean tristique pellentesque massa vitae lobortis. <br></br>
                  2. Suspendisse pellentesque mi quam, sollicitudin congue lacus auctor quisasda <br></br>
                  3. Suspendisse condimentum, lectus sed dignissim malesuada, est sem tristique felis, sit amet ultrices arcu neque a augue. <br></br>
                  4. Nunc quis nibh velit. Fusce gravida condimentum ex, vel tempor enim finibus non. Maecenas eu odio elit. Fusce eget luctus erat. <br></br>
                  5. Vestibulum auctor convallis metus et suscipit. Cras cursus massa nec varius mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. <br></br>
                  6. Nulla accumsan, lorem in blandit convallis, erat ex interdum mauris, sit amet consectetur mauris purus eu augue.</p>
            </div>
            </div>

            <div class="text-box">
              <div class="text">
                  <h2 class="text-center">About</h2>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu varius lorem. Vivamus mattis turpis ut justo congue, at dictum diam maximus. Aenean tristique pellentesque massa vitae lobortis.
                  Suspendisse pellentesque mi quam, sollicitudin congue lacus auctor quis.
                  </p>
              </div>
            </div>
          </div>

          <div class="text-box">
            <div class="text">
              <h2 class="text-center">Controls</h2>
              <div class="text-center item-center row">
                <div >
                  <img class="control-img" src={getAssetPath(`./assets/wsad.png`)} />
                  <h3>Shoot</h3>
                </div>
                
                <div>
                  <img class="control-img" src={getAssetPath(`./assets/arrow.png`)} />
                  <h3>Movement</h3>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
