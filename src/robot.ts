import Table, { Int, int } from "./table";

export enum Direction {
  NORTH, EAST, SOUTH, WEST
}

/**
 * A robot that can move on a table.
 */
export default class Robot {

  public x: Int;
  public y: Int;
  public direction?: Direction;

  constructor() {
    this.x = int(-1);
    this.y = int(-1);
    this.direction = undefined;
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
  public place = (table: Table, x: number, y: number, direction: Direction): boolean => {
    if (table.isValidPosition(x, y)) {
      this.x = int(x);
      this.y = int(y);
      this.direction = direction;
      return true;
    }
    return false;
  }

}
