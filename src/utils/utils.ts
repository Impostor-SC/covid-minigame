export class Position {
  x: number
  y: number
}

let gameMaze: Array< Array< string > > = null
let enemyDict: any = {}
let numberOfEnemies = 0

function findEntity(maze: Array< Array< string > >, toFind: string): Position {
  let result = null
  for (let i = 0; i < maze.length && !result; ++i) {
    for (let j = 0; j < maze[i].length; ++j) {
      if (maze[i][j] === toFind) {
        result = {
          "x": i,
          "y": j
        }
        break
      }
    }
  }
  return result
}

function hideMazeFromPosition(maze: Array< Array< string > >, position: Position): Array< Array< string > > {
  const newMaze = JSON.parse(JSON.stringify(maze))
  for (let i = 0; i < maze.length; ++i) {
    for (let j = 0; j < maze[i].length; ++j) {
      const distance = Math.abs(i - position.x) + Math.abs(j - position.y)
      if (distance > 2) {
        newMaze[i][j] = "-"
      }
    }
  }
  return newMaze
}

function generateHeuristics(maze: Array< Array< string > >) {
  let result = []
  for (let i = 0; i < maze.length; ++i) {
    result.push([])
    for (let j = 0; j < maze[i].length; ++j) {
      switch(maze[i][j]) {
        case '-':
          result[i].push(10)
          break
        case '#':
          result[i].push(0)
          break
        default:
          result[i].push(1)
      }
    }
  }
}

function initEnemies() {
  enemyDict = {}
  for (let i = 0; i < numberOfEnemies; ++i) {
    const enemyId = `X${i}`
    const enemyPosition = findEntity(gameMaze, enemyId)
    const newMaze = hideMazeFromPosition(gameMaze, enemyPosition)
    enemyDict[enemyId] = {
      "maze": newMaze,
      "heuristic": generateHeuristics(newMaze)
    }
  }
}

export function generateMaze(level: number): Array< Array< string > > {
  numberOfEnemies = Math.floor((level + 4) / 5)
  gameMaze = [
    ['#', '.', '.', '.', '#', '#'],
    ['P', '.', '.', '.', '.', 'X0'],
    ['#', '.', '.', '.', '#', '#'],
    ['.', '.', '.', '.', '.', 'F'],
    ['#', '.', '.', '.', '.', '#']
  ]
  initEnemies()
  return hideMazeFromPosition(gameMaze, findPlayer(gameMaze));
}

function findEnemyBestMove(enemyId: string) {
  // TODO
  // ubah value gameMaze
}

function updateEnemyMaze(enemyId: string) {
  // TODO
  return enemyDict[enemyId].maze
}

function updateHeuristics(enemyId: string, maze: Array< Array< string > >) {
  // TODO
  const currentHeuristic = enemyDict[enemyId].heuristic
  return currentHeuristic
}

export function moveAllEnemies(maze: Array< Array< string > >): Array< Array< string > > {
  for (let i = 0; i < numberOfEnemies; ++i) {
    const enemyId = `X${i}`
    findEnemyBestMove(enemyId)
    const newMaze = updateEnemyMaze(enemyId)
    enemyDict[enemyId] = {
      "maze": newMaze,
      "heuristic": updateHeuristics(enemyId, newMaze)
    }
  }
  return hideMazeFromPosition(gameMaze, findPlayer(gameMaze));
}

function findPlayer(maze: Array< Array< string > >): Position {
  return findEntity(maze, 'P')
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
