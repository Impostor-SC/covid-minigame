export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function generateMaze(level: Number): Array< Array< string > > {
  // TODO: Buat algoritma untuk Generate Maze
  return [
    ['#', '.', '.', '.', '#', '#'],
    ['S', '.', '.', '.', '.', 'X'],
    ['#', '.', '.', '.', '#', '#'],
    ['.', '.', '.', '.', '.', 'F'],
    ['#', '.', '.', '.', '.', '#']
  ];
}

export function moveAllEnemies(maze: Array< Array< string > >): Array< Array< string > > {
  // TODO: Buat algoritma untuk gerakin musuh
  return maze;
}

function findPlayer(maze: Array< Array< string > >): any {
  // TODO: Buat algoritma untuk menemukan posisi Player
  return {
    "x": 5,
    "y": 7
  }
}

export function playerMoveRight(maze: Array< Array< string > >): any {
  // TODO: Buat algoritma untuk gerakin player ke kanan
  return {
    "success": true,
    "maze": maze
  }
}

export function playerMoveLeft(maze: Array< Array< string > >): any {
  // TODO: Buat algoritma untuk gerakin player ke kiri
  return {
    "success": true,
    "maze": maze
  }
}

export function playerMoveUp(maze: Array< Array< string > >): any {
  // TODO: Buat algoritma untuk gerakin player ke atas
  return {
    "success": true,
    "maze": maze
  }
}

export function playerMoveDown(maze: Array< Array< string > >): any {
  // TODO: Buat algoritma untuk gerakin player ke bawah
  return {
    "success": true,
    "maze": maze
  }
}

export function playerShoot(maze: Array< Array< string > >): any {
  // TODO: Buat algoritma untuk tembak sabun
  return {
    "success": true,
    "maze": maze
  }
}
