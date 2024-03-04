export enum PlayerIdentifier {
  player = 'player',
  computer = 'computer'
}

export enum PlayerOrientation {
  left = 'left',
  right = 'right'
}

export enum PlayerDirection {
  notMoving = 'notMoving',
  up = 'ArrowUp',
  down = 'ArrowDown'
}

export interface PlayerInterface {
  playerIdentifier: PlayerIdentifier;
  playerOrientation: PlayerOrientation;
  currentPlayerDirection: PlayerDirection;
  readonly x: number;
  y: number;
  readonly playerWidth: number
  readonly playerHeight: number
  setDirection(direction: PlayerDirection): void
  getStartingPosition(canvasHeight: number): number
  draw(ctx: CanvasRenderingContext2D): void
}

export class Player implements PlayerInterface {
  readonly playerIdentifier: PlayerIdentifier;
  playerOrientation: PlayerOrientation;
  currentPlayerDirection: PlayerDirection = PlayerDirection.notMoving;
  readonly x: number = 50;
  y: number;
  readonly playerWidth: number = 20;
  readonly playerHeight: number = 100;

  constructor(canvas: HTMLCanvasElement, playerIdentifier: PlayerIdentifier, playerOrientation: PlayerOrientation) {
    this.playerOrientation = playerOrientation;
    this.playerIdentifier = playerIdentifier;
    this.y = this.getStartingPosition(canvas.height);
  }

  getStartingPosition(canvasHeight: number) {
    return (canvasHeight / 2) - (100 / 2)
  }

  setDirection(direction: PlayerDirection) {
    this.currentPlayerDirection = direction
  }

  moveUp() {
    if (this.y <= 0) return
    this.y -= 2
  }

  moveDown(canvasHeight: number) {
    if (this.y + this.playerHeight >= canvasHeight) return
    this.y += 2
  }

  move(ctx: CanvasRenderingContext2D) {
    if (this.currentPlayerDirection === PlayerDirection.notMoving) return
    this.currentPlayerDirection === PlayerDirection.up ? this.moveUp() : this.moveDown(ctx.canvas.height)
    ctx.clearRect(0, 0, 800, 600)
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.move(ctx)

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(this.x, this.y, this.playerWidth, this.playerHeight)
    ctx.strokeRect(this.x, this.y, this.playerWidth, this.playerHeight)

    if (this.playerIdentifier === PlayerIdentifier.computer) {
      ctx.fillStyle = '#ff6464'
      ctx.fillRect(ctx.canvas.width - this.x - this.playerWidth, this.y, this.playerWidth, this.playerHeight)
      ctx.strokeRect(ctx.canvas.width - this.x - this.playerWidth, this.y, this.playerWidth, this.playerHeight)
    }
  }
}