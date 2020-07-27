import * as process from "process"
import { createReadStream } from "fs"
import { createInterface } from "readline"
import Robot from "./robot"
import Table from "./table"
import Command from "./command"

const inputStream = process.argv[2] ? createReadStream(process.argv[2]) : process.stdin

const cli = createInterface({
  input: inputStream,
  output: process.stdout,
  terminal: false
})

const robot = new Robot()
const table = new Table(5, 5)
const command = new Command(robot, table)

cli.prompt(true)
cli.on("line", (line: string) => {
  command.execute(line)
  cli.prompt(true)
})
