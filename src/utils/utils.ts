export class Position {
  x: number
  y: number
}

let gameMaze: Array< Array< string > > = null
let enemyDict: any = {}
let numberOfEnemies = 0
let sisterSaved = false

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
  return result
}

export function initData() {
  sisterSaved = false

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

function randomChoiceIndex(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return index;
}

export function generateMaze(level: number): Array< Array< string > > {
  let arrEntity = ["X", "P", "F", "S", "#"]
  numberOfEnemies = Math.floor((level + 4) / 5);
  let width = 10;
  let height = 7;
  let pWall = (20*width*height) / 100

  gameMaze = []
  for(let i = 0; i < height; i++) {
    let temp = []
    for(let j = 0; j < (width + 2*numberOfEnemies - 1); j++) {
      temp.push(".")
    }
    gameMaze.push(temp)
  }

  while(true) {
    if(arrEntity.length < 1) {
      break
    }
    else {
      let row = randomChoiceIndex(gameMaze)
      let col = randomChoiceIndex(gameMaze[row])
      if (gameMaze[row][col] !== ".") {
        continue
      }
      gameMaze[row][col] = arrEntity[0]
      if (arrEntity[0] === "#" && pWall > 0) {
        pWall--
      }
      else {
        arrEntity.splice(0, 1)
      }
    }
  }
  
  // initEnemies()
  return hideMazeFromPosition(gameMaze, findPlayer());
  // return gameMaze;
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
  // for (let i = 0; i < numberOfEnemies; ++i) {
  //   const enemyId = `X${i}`
  //   findEnemyBestMove(enemyId)
  //   const newMaze = updateEnemyMaze(enemyId)
  //   enemyDict[enemyId] = {
  //     "maze": newMaze,
  //     "heuristic": updateHeuristics(enemyId, newMaze)
  //   }
  // }
  return hideMazeFromPosition(gameMaze, findPlayer());
}

function findPlayer(): Position {
  return findEntity(gameMaze, 'P')
}

function canMoveTo(entityCode: string, pos: Position): number {
  if (pos.x >= 0 && pos.x < gameMaze.length && pos.y >= 0 && pos.y < gameMaze[0].length) {
    if (gameMaze[pos.x][pos.y] === ".") return 1
    if (entityCode !== "P") return 0
    if (gameMaze[pos.x][pos.y] === "S") return 2
    if (gameMaze[pos.x][pos.y] === "F") return 3
  }
  return 0
}

function moveEntity(entityCode: string, toMove: Position): any {
  const playerPosition = findEntity(gameMaze, entityCode)
  playerPosition.x += toMove.x
  playerPosition.y += toMove.y
  const moveSuccess = canMoveTo(entityCode, playerPosition)
  if (moveSuccess > 0 && (sisterSaved || moveSuccess !== 3)) {
    gameMaze[playerPosition.x][playerPosition.y] = gameMaze[playerPosition.x - toMove.x][playerPosition.y - toMove.y]
    gameMaze[playerPosition.x - toMove.x][playerPosition.y - toMove.y] = '.'
  }
  if (moveSuccess === 2) {
    sisterSaved = true
  }
  return {
    "success": moveSuccess,
    "maze": hideMazeFromPosition(gameMaze, findPlayer())
  }
}

export function playerMoveRight(): any {
  return moveEntity('P', {
    x: 0,
    y: 1
  })
}

export function playerMoveLeft(): any {
  return moveEntity('P', {
    x: 0,
    y: -1
  })
}

export function playerMoveUp(): any {
  return moveEntity('P', {
    x: -1,
    y: 0
  })
}

export function playerMoveDown(): any {
  return moveEntity('P', {
    x: 1,
    y: 0
  })
}

export function playerShoot(): any {
  // TODO: Buat algoritma untuk tembak sabun
  return {
    "success": true,
    "maze": gameMaze
  }
}
