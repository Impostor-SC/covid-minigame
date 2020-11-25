import { Component, Host, h, getAssetPath, State, Prop } from '@stencil/core';

@Component({
  tag: 'lose-screen',
  styleUrl: 'lose-screen.css',
  shadow: true,
  assetsDirs: ['assets']
})

export class LoseScreen {
  @State() route: string = "menu";
  @Prop() startGame: Function;

  render() {
    return (
      <Host>
        <div class="container">
          <div class="content">
            <img class="lose-img" src={getAssetPath(`./assets/lose.png`)} />
            <div class="lose-text text-center">
              <div>
                <h1>Kamu terjangkit Covid-19!</h1>
                <h1>GAME OVER</h1>
                <h3>Level 99</h3>
              </div>
              <div class="score">
                <h2>Your Score:</h2>
                <h3>00000</h3>
              </div>
              <button class="next-btn" onClick={() => this.startGame()}>Play Again</button>
            </div>

            <div class="about">
              <div class="about-content">
                <h2 class="text-center">About</h2>
                <ul>
                  <li>
                    Goal dari game ini adalah menjemput adik perempuan player yang tersembunyi di map dan membawanya ke blok finish (home).
                  </li>
                  <li>
                    Dalam perjalanan player mencari adik, akan ada musuh-musuh yang mengejar player dan akan menyerang player jika berada di blok yang sama. 
                  </li>
                  <li>
                    Player dapat melihat dua blok di atas, bawah, kanan, kirinya, dan juga 1 blok diagonal di sekitarnya (seperti belah ketupat). Namun player tidak bisa melihat blok yang terhalang tembok.
                  </li>
                  <div class="vision-img"><img class="vision-img-size"src={getAssetPath(`./assets/vision.jpg`)} /></div>
                  
                  <li>
                    Player diberikan 3 masker yang akan berkurang jika terserang oleh musuh. Jika masker habis dan player terserang lagi, maka player akan kalah.
                  </li>
                  <li>
                    Player juga diberikan senjata (sabun) yang bisa ditembakkan ke musuh. Musuh akan mati jika terkena sabun. Jarak tembaknya adalah 2 blok dari blok player berdiri.
                  </li>
                  <li>
                    Terdapat sabun di map dan player dapat mengambilnya
                  </li>
                </ul>
              </div>
            </div>
          </div>
        
        </div>
      </Host>
    );
  }

}
