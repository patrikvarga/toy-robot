import Table, { Int, int } from "./table"

export enum Direction {
  NORTH, EAST, SOUTH, WEST
}

type Position = {
  x: Int,
  y: Int,
  direction?: Direction
}

const clockwiseDirections: Direction[] = [
  Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST
]

const counterClockwiseDirections: Direction[] = [
  Direction.NORTH, Direction.WEST, Direction.SOUTH, Direction.EAST
]

/**
 * A robot that can move on a table.
 */
export default class Robot {

  public x: Int
  public y: Int
  public direction?: Direction

  constructor() {
    this.x = int(-1)
    this.y = int(-1)
    this.direction = undefined
  }

  /**
   * Place a robot into the specified coordinates on a table, facing specified direction.
   *
   * @param table the target table
   * @param x x coordinate
   * @param y y coordinate
   * @param direction the robot will face this direction
   * @returns true if successful, false otherwise
   */
  public place = (table: Table, x: number, y: number, direction?: Direction): boolean => {
    if (table.isValidPosition(x, y) && direction !== undefined) {
      this.x = int(x)
      this.y = int(y)
      this.direction = direction
      return true
    }
    return false
  }

  private turn = (directions: Direction[]): boolean => {
    if (this.direction !== undefined) {
      this.direction = directions[(directions.indexOf(this.direction) + 1) % 4]
      return true
    }
    return false
  }

  public turnLeft = (): boolean => this.turn(counterClockwiseDirections)

  public turnRight = (): boolean => this.turn(clockwiseDirections)

  public report = (): Position => ({
    x: this.x,
    y: this.y,
    direction: this.direction
  })

  public move = (table: Table): boolean => {
    const newPosition = this.calculateNextPosition()
    return this.place(table, newPosition.x, newPosition.y, newPosition.direction)
  }

  private calculateNextPosition = (): Position => ({
    x: int(this.direction === Direction.EAST ? this.x + 1 : this.direction === Direction.WEST ? this.x - 1 : this.x),
    y: int(this.direction === Direction.NORTH ? this.y + 1 : this.direction === Direction.SOUTH ? this.y - 1 : this.x),
    direction: this.direction
  })

}
