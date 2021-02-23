const { processCommands, parsePosition, isPositionInBoundary } = require('./utils')

/** @todo validate input args */
/** @todo validate input position againts bounds */
/** @todo update to handle negative position coords */

;(() => {
  try {
    const input = process.argv[2].split(' ')
    const bounds = input[0]
    const startingPosition = input[1]
    const startingDirection = input[2]
    const commandsStr = input[3]

    if (!isPositionInBoundary(parsePosition(bounds), parsePosition(startingPosition))) {
      console.log(`Starting position (${startingPosition}) is out of bounds`)
      return false
    }

    const newPosition = processCommands(bounds, startingPosition, startingDirection, commandsStr)
    console.log('NEW POSITION: ', newPosition)
  } catch (error) {
    console.log('ERROR: ', error)
  }
})()
