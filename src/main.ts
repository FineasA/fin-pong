import { GameBoard } from './GameBoard.ts'
import { Player, PlayerOrientation, PlayerIdentifier, PlayerDirection } from './Player.ts'

import './style.css'

function gameSetup(canvas: HTMLCanvasElement) {
  const player = new Player(canvas, PlayerIdentifier.player, PlayerOrientation.left)
  const computer = new Player(canvas, PlayerIdentifier.computer, PlayerOrientation.right)

  const gameBoard = new GameBoard(canvas, [player, computer])

  window.addEventListener('keydown', (event) => {
    if (event.key !== PlayerDirection.up && event.key !== PlayerDirection.down) return
    player.setDirection(event.key)
  })

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