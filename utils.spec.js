const { expect } = require('@jest/globals')
const {
  isPositionInBoundary,
  parseBounds,
  parsePosition,
  move,
  changeDirection,
  processCommands
} = require('./utils')

describe('Mars rover tests', () => {
  test('isPositionInBoundary', () => {
    expect(isPositionInBoundary([8, 8], [8, 8])).toBe(true)
    expect(isPositionInBoundary([8, 8], [9, 8])).toBe(false)
    expect(isPositionInBoundary([8, 8], [5, 10])).toBe(false)
    expect(isPositionInBoundary([8, 8], [-1, -2])).toBe(false)
  })

  test('parseBounds', () => {
    expect(parseBounds('88')).toEqual([8, 8])
    expect(parseBounds('21')).toEqual([2, 1])
    expect(parseBounds('00')).toEqual([0, 0])
  })

  test('parsePosition', () => {
    expect(parsePosition('12')).toEqual([1, 2])
    expect(parsePosition('38')).toEqual([3, 8])
    expect(parsePosition('51')).toEqual([5, 1])
  })
  
  test('move', () => {
    expect(move('N', [1, 2])).toEqual([1, 3])
    expect(move('N', [2, 3])).toEqual([2, 4])
    expect(move('S', [2, 3])).toEqual([2, 2])
    expect(move('E', [2, 3])).toEqual([3, 3])
    expect(move('W', [4, 2])).toEqual([3, 2])
  })

  test('changeDirection', () => {
    expect(changeDirection('L', 'N')).toEqual('W')
    expect(changeDirection('L', 'W')).toEqual('S')
    expect(changeDirection('L', 'S')).toEqual('E')
    expect(changeDirection('L', 'E')).toEqual('N')
    expect(changeDirection('R', 'N')).toEqual('E')
    expect(changeDirection('R', 'W')).toEqual('N')
    expect(changeDirection('R', 'S')).toEqual('W')
    expect(changeDirection('R', 'E')).toEqual('S')
  })

  test('rover moves as expected if resulting position is in bounds', () => {
    expect(processCommands('88', '12', 'E', 'MMLMRMMRRMML')).toEqual('33S')
    expect(processCommands('88', '12', 'E', 'MMLMRMMRRMM')).toEqual('33W')
    expect(processCommands('88', '12', 'E', 'MMLMRMRRMML')).toEqual('23S')
    expect(processCommands('88', '88', 'S', 'MMRMM')).toEqual('66W')
    expect(processCommands('88', '12', 'E', 'MMLMRMMRRMML')).toEqual('33S')
  })

  test('rover stops at last possible position if result position is out of bounds', () => {
    expect(processCommands('88', '00', 'E', 'MMLMRMMRRMMLMM')).toEqual('20S')
    expect(processCommands('88', '11', 'E', 'MMLMMLMMMMMMM')).toEqual('03W')
  })
})
