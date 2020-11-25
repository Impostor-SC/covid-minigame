export class Position {
  x: number
  y: number
}

let gameMaze: Array< Array< string > > = null
let enemyVisited: any = {}
export let numberOfEnemies = 0
let sisterSaved: boolean
let playerHealth: number

const CHEAT_MODE = false

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
  return newMaze
}

function generateHeuristics(maze: Array< Array< string > >, position: Position, id: string) {
  let result = []
  for (let i = 0; i < maze.length; ++i) {
    result.push([])
    for (let j = 0; j < maze[i].length; ++j) {
      if(maze[i][j] == "P"){
        result[i].push(1000)
      }
      else if(maze[i][j] == "#" || maze[i][j] == "S" || maze[i][j] == "F"){
        result[i].push(0)
      }
      else {
        result[i].push(enemyVisited[id][i][j])
      }
    }
  }
  return result
}

function generateVisitedArray(maze: Array< Array< string > >, position: Position) {
  let result = []
  for (let i = 0; i < maze.length; ++i) {
    result.push([])
    for (let j = 0; j < maze[i].length; ++j) {
      if(i == position.x && j == position.y){
        result[i].push(0)
      }
      else{
        result[i].push(1)
      }
    }
  }
  return result
}

export function initData() {
  playerHealth = 3
  sisterSaved = false

  enemyVisited = {}
  for (let i = 0; i < numberOfEnemies; ++i) {
    const enemyId = `X${i}`
    const enemyPosition = findEntity(gameMaze, enemyId)
    const newMaze = hideMazeFromPosition(gameMaze, enemyPosition)
    enemyVisited[enemyId] = generateVisitedArray(newMaze, enemyPosition)
  }
}

function randomChoiceIndex(a: number, b: number) {
  var index = a + Math.floor(Math.random() * (b-a));
  return index;
}

export function generateMaze(level: number): Array< Array< string > > {
  let arrEntity = ["P", "F", "S", "X", "#"]
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
      let ent = arrEntity[0]
      let row = 0
      let col = 0
      let oddAddition = Math.floor((numberOfEnemies+1)/2 - 1)
      let evenAddition = Math.floor((numberOfEnemies)/2 - 1)
      if (ent === "P") {
        row = randomChoiceIndex(0, 3)
        col = randomChoiceIndex(0, 3 + oddAddition)
      } else if (ent === "F") {
        row = randomChoiceIndex(gameMaze.length - 3, gameMaze.length)
        col = randomChoiceIndex(gameMaze[0].length - 3 - oddAddition, gameMaze[0].length)
      } else if (ent === "S") {
        row = randomChoiceIndex(0, gameMaze.length)
        col = randomChoiceIndex(gameMaze[0].length/2 - 1 - evenAddition, gameMaze[0].length/2 + 1 + evenAddition)
      } else if (ent === "X") {
        let post = []
        post.push([randomChoiceIndex(4, gameMaze.length), randomChoiceIndex(0, 4 + oddAddition)])
        post.push([randomChoiceIndex(0, 4), randomChoiceIndex(gameMaze[0].length - 3 - oddAddition, gameMaze[0].length)])
        post.push([randomChoiceIndex(0, gameMaze.length), 3 + 1 + oddAddition])
        post.push([randomChoiceIndex(0, gameMaze.length), gameMaze[0].length - 3 - 1 - oddAddition])
        let choice = randomChoiceIndex(0, post.length)
        row = post[choice][0]
        col = post[choice][1]
      }
      else {
        row = randomChoiceIndex(0, gameMaze.length)
        col = randomChoiceIndex(0, gameMaze[0].length)
      }

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
      } else {
        arrEntity.splice(0, 1)
      }
    }
  }
  
  initData()
  return CHEAT_MODE ? gameMaze : hideMazeFromPosition(gameMaze, findPlayer());
}

function getMoveScore(
  heuristics: Array< Array< number > >, 
  topLeft: Position, 
  bottomRight: Position
  ): number {
  let score = 0
  for(let i = topLeft.x; i <= bottomRight.x; i++){
    for(let j = topLeft.y; j <= bottomRight.y; j++){
      score += heuristics[i][j]
    }
  }
  return score
}

function findEnemyBestMove(enemyId: string) {
  let maze = hideMazeFromPosition(gameMaze, findEntity(gameMaze, enemyId))
  let heuristics = generateHeuristics(maze, findEntity(gameMaze, enemyId), enemyId)
  let possibleMoves = []
  let selectedMove = 0
  let width = gameMaze[0].length
  let height = gameMaze.length

  for(let i = 0; i < 4; i++){
    let newPosition = findEntity(gameMaze, enemyId)
    newPosition.x += directionList[i].x
    newPosition.y += directionList[i].y

    let topLeft = new Position()
    let bottomRight = new Position()

    if(i == 0){
      topLeft.x = newPosition.x
      bottomRight.x = height - 1
      topLeft.y = 0
      bottomRight.y = width - 1
    }
    else if(i == 1){
      topLeft.x = 0
      bottomRight.x = newPosition.x
      topLeft.y = 0
      bottomRight.y = width - 1
    }
    else if(i == 2){
      topLeft.x = 0
      bottomRight.x = height - 1
      topLeft.y = newPosition.y
      bottomRight.y = width - 1
    }
    else{
      topLeft.x = 0
      bottomRight.x = height - 1
      topLeft.y = 0
      bottomRight.y = newPosition.y
    }

    let canMove = canMoveTo(enemyId, newPosition)
    if(canMove != 0){
      possibleMoves.push({
        "moveIndex": i,
        "score": getMoveScore(heuristics, topLeft, bottomRight)
      })
    }
  }

  let sumScore = 0
  for(let possibleMove of possibleMoves){
    sumScore += possibleMove["score"]
  }

  if(sumScore == 0) return 0

  let randomNumber = randomChoiceIndex(0, sumScore)

  for(let possibleMove of possibleMoves){
    randomNumber -= possibleMove["score"]
    if(randomNumber < 0){
      selectedMove = possibleMove["moveIndex"]
      break
    }
  }

  const chosenMove = directionList[selectedMove]
  moveEntity(enemyId, chosenMove)
  let newPosition = findEntity(gameMaze, enemyId)
  enemyVisited[enemyId][newPosition.x][newPosition.y] = 0
}

export function moveAllEnemies(): any {
  for (let i = 0; i < numberOfEnemies; ++i) {
    const enemyId = `X${i}`
    if (findEntity(gameMaze, enemyId)) {
      findEnemyBestMove(enemyId)
    }
  }
  return {
    health: playerHealth,
    maze: CHEAT_MODE ? gameMaze : hideMazeFromPosition(gameMaze, findPlayer())
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
  if(moveSuccess == -1) {
    playerHealth -= 1
  }
  return {
    "success": moveSuccess,
    "maze": CHEAT_MODE ? gameMaze : hideMazeFromPosition(gameMaze, findEntity(gameMaze, entityCode))
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

function shootEntity(from: Position, direction: Position): any {
  const LINEOFSIGHT = 2
  for (let i = 1; i <= LINEOFSIGHT; ++i) {
    const x = from.x + direction.x * i
    const y = from.y + direction.y * i
    if (gameMaze[x][y].startsWith("X")) {
      gameMaze[x][y] = "."
      return {
        "success": 12,
        "maze": hideMazeFromPosition(gameMaze, findPlayer())
      }
    }
  }
  return {
    "success": 11,
    "maze": hideMazeFromPosition(gameMaze, findPlayer())
  }
}

export function playerShootUp(): any {
  return shootEntity(findPlayer(), {
    x: -1,
    y: 0
  })
}

export function playerShootLeft(): any {
  return shootEntity(findPlayer(), {
    x: 0,
    y: -1
  })
}

export function playerShootDown(): any {
  return shootEntity(findPlayer(), {
    x: 1,
    y: 0
  })
}

export function playerShootRight(): any {
  return shootEntity(findPlayer(), {
    x: 0,
    y: 1
  })
}
