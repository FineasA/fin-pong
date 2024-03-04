import { GameBoard } from './GameBoard.ts'
import { Player, PlayerOrientation, PlayerIdentifier, PlayerDirection } from './Player.ts'

import './style.css'

function gameSetup(canvas: HTMLCanvasElement) {
  const player = new Player(canvas, PlayerIdentifier.player, PlayerOrientation.left)
  const computer = new Player(canvas, PlayerIdentifier.computer, PlayerOrientation.right)

  const gameBoard = new GameBoard(canvas, [player, computer])
  gameBoard.draw()
}

function main() {
  const app = document.getElementById('app')

  if (!app) {
    throw new Error('App not found')
  }

  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  app.appendChild(canvas)
  gameSetup(canvas)
}

main()