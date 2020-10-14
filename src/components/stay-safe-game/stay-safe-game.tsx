import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'stay-safe-game',
  styleUrl: 'stay-safe-game.css',
  shadow: true,
})
export class StaySafeGame {

  @State() level = 1;
  @State() isLoading = true;
  @State() maze = [
    ['#', '.', '.', '.', '#', '#'],
    ['S', '.', '.', '.', '.', 'X'],
    ['#', '.', '.', '.', '#', '#'],
    ['.', '.', '.', '.', '.', 'F'],
    ['#', '.', '.', '.', '.', '#']
  ];

  componentDidMount() {
    // do some stuff
  }

  render() {
    return (
      <Host>
        <h1 class="title">Stay Safe!</h1>
        <div class="game-wrapper">
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
        </div>
      </Host>
    );
  }

}
