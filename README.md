# Toy Robot Simulator

This is a possible small solution of the Toy Robot Simulator exercise in Node.js and TypeScript, as described [here](./DESCRIPTION.md).

## Usage

To install dependencies, use: `npm i`. After this, the app is ready to use as there is no need for building anything.

To run the tests, use `npm run test`, or in watch mode: `npm run test:watch`.

Running the CLI is as easy as `npm start`. (Watch mode is also available using `npm run start:watch`.)
To use file input instead of stdin, use `npm start -- commands.txt`

In addition to the expected commands, you can also use `DEBUG`, `EXIT` and `HELP`. Type `HELP` in the tool to see details.

## Considerations

The focus is on:

* A thin slice of working functionality delivered (CLI, file usage)
* Good code quality, structure, readability and testing
* Good UX (extra commands in the tool, readme, npm commands)

Due to timeboxing of the exercise, certain trade-offs were made of course, mostly around:

* Error handling (not covering all unexpected inputs and scenarios, other than the suggested ignoring approach)
* Test coverage (not testing the file and input parsing much)
* Plenty of redundant stuff was pulled up / factored out, but not everything (like position, or repeated code in tests)
