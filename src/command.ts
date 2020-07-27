import Robot, { Direction } from "./robot"
import Table from "./table"

export default class Command {

  private robot: Robot
  private table: Table
  private debug: boolean

  constructor(robot: Robot, table: Table) {
    this.robot = robot
    this.table = table
    this.debug = false
  }

  private log = (message: string, force: boolean = false): void => {
    if (this.debug || force) {
      process.stdout.write(message + "\n")
    }
  }
  private logFeedback = (feedback: boolean): void => this.log(feedback ? "DONE" : "IGNORED")

  public execute(command: string): void {
    const normalisedCommand = command.toUpperCase()
    switch (normalisedCommand) {
      case "EXIT":
        process.exit()
      case "QUIT":
        process.exit()
      case "HELP":
        this.log("Valid commands:\n", true)
        this.log("PLACE X,Y,F: place the robot", true)
        this.log("MOVE:        move forward", true)
        this.log("LEFT:        turn left", true)
        this.log("RIGHT:       turn right", true)
        this.log("REPORT:      print position", true)
        this.log("DEBUG:       turn debug on/off", true)
        this.log("HELP:        this help", true)
        this.log("EXIT:        exit the app", true)
        break
      case "DEBUG":
        this.debug = !this.debug
        this.log("DEBUG is now " + (this.debug ? "ON" : "OFF"))
        break
      case "LEFT":
        this.logFeedback(this.robot.turnLeft())
        break
      case "RIGHT":
        this.logFeedback(this.robot.turnRight())
        break
      case "MOVE":
        this.logFeedback(this.robot.move(this.table))
        break
      case "REPORT":
        this.report()
        break
      default:
        if (normalisedCommand.startsWith("PLACE ")) {
          this.place(command.substring(6))
        } else {
          this.log("unknown command")
        }
    }
  }

  private report = (): void => {
    const position = this.robot.report()
    const direction = position.direction === undefined ? undefined : Direction[position.direction]
    this.log(position.x + "," + position.y + "," + direction, true)
  }

  private place = (placement: string): void => {
    const params = placement.split(",")
    const x = Number(params[0])
    const y = Number(params[1])
    const direction = params[2].toUpperCase() as keyof typeof Direction
    this.logFeedback(this.robot.place(this.table, x, y, Direction[direction]))
  }
}
