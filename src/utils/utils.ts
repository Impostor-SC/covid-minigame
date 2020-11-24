export class Position {
  x: number
  y: number
}

let gameMaze: Array< Array< string > > = null
let enemyDict: any = {}
let numberOfEnemies = 0
let sisterSaved: boolean
let playerHealth: number

const directionList = [
  {
    x: 1,
    y: 0
  },
  {
    x: -1,
    y: 0
  },
  {
    x: 0,
    y: 1
  },
  {
    x: 0,
    y: -1
  }
]

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
      let a = i - position.x
      let b = j - position.y
      const distance = Math.abs(a) + Math.abs(b)
      if (distance > 2) {
        newMaze[i][j] = "-"
      }
      else if (distance == 2 ) {
        try{

          if(Math.abs(a) === 2 && Math.abs(b) === 0) {
            if (a < 0 && maze[position.x - 1][j] === "#") {
                newMaze[i][j] = "-"
            }
            else if (a > 0 && maze[position.x + 1][j] === "#") {
                newMaze[i][j] = "-"
            }
          }
          else if(Math.abs(a) === 0 && Math.abs(b) === 2) {
            if (b < 0 && maze[i][position.y - 1] === "#") {
                newMaze[i][j] = "-"
            }
            else if (b > 0 && maze[i][position.y + 1] === "#") {
                newMaze[i][j] = "-"
            }
          }
          else if(Math.abs(a) === 1 && Math.abs(b) === 1) {
            if (a < 0 && b < 0 && maze[position.x - 1][position.y] === "#" && maze[position.x][position.y - 1] === "#") {
                newMaze[i][j] = "-"
            }
            else if (a < 0 && b > 0 && maze[position.x - 1][position.y] === "#" && maze[position.x][position.y + 1] === "#") {
              newMaze[i][j] = "-"
            }
            else if (a > 0 && b > 0 && maze[position.x][position.y + 1] === "#" && maze[position.x + 1][position.y] === "#") {
              newMaze[i][j] = "-"
            }
            else if (a > 0 && b < 0 && maze[position.x + 1][position.y] === "#" && maze[position.x][position.y - 1] === "#") {
              newMaze[i][j] = "-"
            }
          }
        }
        catch(err) {
          continue
        }
      }
    }
  }
  return maze
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
  playerHealth = 3
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
  let enemyCounter = 0
  numberOfEnemies = Math.floor((level + 4) / 5);
  let width = 10;
  let height = 7;
  let pWall = (20*width*height) / 100

  gameMaze = []
  for(let i = 0; i < height; i++) {
    let temp = []
    for(let j = 0; j < (width + 2*numberOfEnemies - 2); j++) {
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
      if (arrEntity[0] === 'X') {
        gameMaze[row][col] += enemyCounter
        enemyCounter += 1
        if (enemyCounter === numberOfEnemies) {
          arrEntity.splice(0, 1)
        }
      } else if (arrEntity[0] === "#" && pWall > 0) {
        pWall--
      }
      else {
        arrEntity.splice(0, 1)
      }
    }
  }
  
  initData()
  return hideMazeFromPosition(gameMaze, findPlayer());
  // return gameMaze;
}

function findEnemyBestMove(enemyId: string) {
  const chosenMove = directionList[Math.floor(Math.random() * 4)]
  const moveResult = moveEntity(enemyId, chosenMove)
  if (moveResult.success > 0) {
    enemyDict[enemyId].maze = hideMazeFromPosition(gameMaze, findEntity(gameMaze, enemyId))
  } else if (moveResult.success === -1) {
    playerHealth -= 1
  }
}

export function moveAllEnemies(): any {
  for (let i = 0; i < numberOfEnemies; ++i) {
    const enemyId = `X${i}`
    findEnemyBestMove(enemyId)
  }
  return {
    health: playerHealth,
    maze: hideMazeFromPosition(gameMaze, findPlayer())
  }
}

function findPlayer(): Position {
  return findEntity(gameMaze, 'P')
}

function canMoveTo(entityCode: string, pos: Position): number {
  if (pos.x >= 0 && pos.x < gameMaze.length && pos.y >= 0 && pos.y < gameMaze[0].length) {
    if (gameMaze[pos.x][pos.y] === ".") return 1
    if (entityCode.startsWith("X") && gameMaze[pos.x][pos.y] === "P") return -1
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
  if (moveSuccess === 1 || (entityCode === "P" && moveSuccess > 0 && (sisterSaved || moveSuccess !== 3))) {
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
