export type Int = number & { __int__: void };
export const int = (num: number): Int => Math.round(num) as Int;

/**
 * A table that a robot can move on.
 * 
 * Coordinates are zero-based and rounded to nearest int in every method.
 */
export default class Table {

  readonly width: Int;
  readonly height: Int;

  constructor(width: number, height: number) {
    if (int(width) < 1 || int(height) < 1) {
      throw new Error("Invalid parameters: width=" + width + ", height=" + height);
    }
    this.width = int(width);
    this.height = int(height);
  }

  /**
   * Checks if a given position is on the table.
   */
  public isValidPosition = (x: number, y: number): boolean =>
    0 <= int(x) && int(x) < this.width &&
    0 <= int(y) && int(y) < this.height;

}
