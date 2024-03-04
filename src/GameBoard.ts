import { PlayerInterface } from './Player.ts'

export interface GameBoardInterface {
  canvas: HTMLCanvasElement
  players: Array<PlayerInterface>
  draw(): void

  readonly dividerWidth: number
}

export class GameBoard implements GameBoardInterface {
  canvas: HTMLCanvasElement
  players: Array<PlayerInterface>
  readonly dividerWidth: number = 20
  constructor(canvas: HTMLCanvasElement, players: Array<PlayerInterface>) {
    this.canvas = canvas
    this.players = players
  }

  drawDivider(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.fillStyle = '#646cff'
    ctx.fillRect(width / 2, 0, this.dividerWidth, height)
  }

  draw() {
    this.players.forEach(player => {
      const ctx = this.canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Canvas not found')
      }
      player.draw(ctx)
      this.drawDivider(ctx, this.canvas.width, this.canvas.height)
    })

    window.requestAnimationFrame(() => this.draw())
  }
}