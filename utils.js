const { directions } = require('./constants')

const isPositionInBoundary = (bounds, position) => {
  const [bx, by] = bounds
  const [px, py] = position
  return (px >= 0 && px <= bx) && (py >= 0 && py <= by)
}

const parseBounds = (bounds) =>
  Array.from(bounds, coordinate => parseInt(coordinate))

const parsePosition = (position) =>
  Array.from(position).map(c => parseInt(c))

const move = (direction, position) => {
  switch (direction) {
    case 'N':
      return [position[0], position[1] + 1]
    case 'E':
      return [position[0] + 1, position[1]]
    case 'S':
      return [position[0], position[1] - 1]
    case 'W':
      return [position[0] - 1, position[1]]
    default:
      throw new Error('Unknown direction')
  }
}

const changeDirection = (command, direction) => {
  const currentDirectionIndex = directions.findIndex(point => point === direction)
  const newDirection = command === 'L'
    ? currentDirectionIndex === 0
      ? directions[directions.length - 1]
      : directions[currentDirectionIndex - 1]
    : currentDirectionIndex === directions.length - 1
      ? directions[0]
      : directions[currentDirectionIndex + 1]
  return direction = newDirection
}

const processCommands = (bounds, currentPosition, currentDirection, commandsStr) => {
  const boundsPosition = parsePosition(bounds)
  let position = parsePosition(currentPosition)
  let direction = currentDirection
  const commandsArr = Array.from(commandsStr)
  
  commandsArr.forEach(cmd => {
    if (['R', 'L'].includes(cmd)) {
      direction = changeDirection(cmd, direction)
    } else {
      const newPosition = move(direction, position)
      if (isPositionInBoundary(boundsPosition, newPosition)) {
        position = newPosition
      }
    }
  })

  return position.join('') + direction
}

module.exports = {
  isPositionInBoundary,
  parseBounds,
  parsePosition,
  move,
  changeDirection,
  processCommands
}