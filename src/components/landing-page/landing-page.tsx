import { Component, Host, h, State, getAssetPath, Prop } from '@stencil/core';
@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class LandingPage {
  @State() route: string = "menu";
  @Prop() startGame: Function;

  render() {
    return (
      <Host>
        <div class="container">
          <div class="start">
            <img class="img" src={getAssetPath(`./assets/coronavirus2.png`)} />
            <div class="sub-start">
              <h1>Stay Safe!</h1>
              <button class="start-btn" onClick={() => this.startGame()}>Start</button>
            </div>
          </div>

          <div class="about-control">
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


            <div class="control-story">
              <div class="story-container">
                <div class="story">
                    <div class="story-content">
                      <h2 class="text-center">Story</h2>
                      <p>
                        Alghi adalah warga Garut yang sehat. Ia memiliki adik perempuan bernama Putri yang tinggal di Depok. Alghi hendak menjemput Putri dan membawanya ke Garut supaya Putri tidak terinfeksi covid. Depok merupakan zona merah covid, dimana banyak orang terinfeksi covid yang berjalan-jalan di luar rumah dan tidak mengisolasi dirinya. Mereka berniat menularkan virus corona ke semua orang. 
                        Tolong bantu Alghi untuk menjemput Putri dan membawanya pulang ke zona aman dengan selamat!
                      </p>
                    </div>
                </div>
              </div>

              <div class="control">
                <div class="control-content">
                  <h2 class="text-center">Controls</h2>
                  <div class= "control-keys">
                    <div>
                      <img class="control-img" src={getAssetPath(`./assets/wsad.png`)} />
                      <h3 class="text-center">Movement</h3>
                    </div>
                    
                    <div>
                      <img class="control-img" src={getAssetPath(`./assets/shoot.png`)} />
                      <h3 class="text-center">Shoot</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>       
        </div>
      </Host>
    );
  }
}
