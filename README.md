# Mars Rover Assignment

## Getting Started

`$ npm install`

## Running the script
`$ npm run start '88 12 N MMSDL'`

- 1st param: element in array is the bounds.
- 2nd param: current position
- 3rd param: commands sequence

## Running the tests
`$ npm run test`

## Examples

```
$ npm run start '88 12 E MMLMRMMRRMML'
=> 33S
$ npm run start '88 12 E MMLMRMMRRMM'
=> 33W
$ npm run start '88 12 E MMLMRMRRMML'
=> 23S
$ npm run start '88 74 E MRMMMMRMM'
=> 60W
```

## 