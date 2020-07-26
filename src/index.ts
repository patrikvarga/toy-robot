import * as process from "process"
import { createInterface } from "readline"

const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

cli.prompt(true)
cli.on("line", (line: string) => {
  cli.prompt(true)
})
