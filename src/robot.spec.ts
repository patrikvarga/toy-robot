import { expect } from "chai"
import Robot, { Direction } from "./robot"
import Table from "./table"
import sinon, { SinonMock } from "sinon"

describe("robot", () => {

  let table: Table
  let robot: Robot

  beforeEach(() => {
    robot = new Robot()
    table = new Table(1, 1)
    sinon.stub(table, "isValidPosition").returns(true)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe("creation", () => {
    it("does not set X coordinate", () => {
      expect(robot.x).to.eq(-1)
    })

    it("does not set Y coordinate", () => {
      expect(robot.y).to.eq(-1)
    })

    it("does not set direction", () => {
      expect(robot.direction).to.eq(undefined)
    })
  })

  describe("placement", () => {
    it("is ignored on invalid table coordinates", () => {
      sinon.restore()
      sinon.stub(table, "isValidPosition").returns(false)

      expect(robot.place(table, 666, 999, Direction.EAST)).to.eq(false)
    })

    it("is ignored on unspecified direction", () => {
      expect(robot.place(table, 666, 999, undefined)).to.eq(false)
    })

    it("is accepted on valid table coordinates", () => {
      expect(robot.place(table, 666, 999, Direction.EAST)).to.eq(true)
    })

    it("sets robot's X coordinate when accepted", () => {
      robot.place(table, 666, 999, Direction.EAST)
      expect(robot.x).to.eq(666)
    })

    it("sets robot's Y coordinate when accepted", () => {
      robot.place(table, 666, 999, Direction.EAST)
      expect(robot.y).to.eq(999)
    })

    it("sets robot's direction when accepted", () => {
      robot.place(table, 666, 999, Direction.EAST)
      expect(robot.direction).to.eq(Direction.EAST)
    })
  })

  describe("turning left", () => {
    it("from NORTH is now facing WEST", () => {
      robot.place(table, 666, 999, Direction.NORTH)

      expect(robot.turnLeft()).to.eq(true)
      expect(robot.direction).to.eq(Direction.WEST)
    })

    it("from EAST is now facing NORTH", () => {
      robot.place(table, 666, 999, Direction.EAST)

      expect(robot.turnLeft()).to.eq(true)
      expect(robot.direction).to.eq(Direction.NORTH)
    })

    it("from SOUTH is facing EAST", () => {
      robot.place(table, 666, 999, Direction.SOUTH)

      expect(robot.turnLeft()).to.eq(true)
      expect(robot.direction).to.eq(Direction.EAST)
    })

    it("from WEST is facing SOUTH", () => {
      robot.place(table, 666, 999, Direction.WEST)

      expect(robot.turnLeft()).to.eq(true)
      expect(robot.direction).to.eq(Direction.SOUTH)
    })
  })

  describe("turning right", () => {
    it("from NORTH is now facing EAST", () => {
      robot.place(table, 666, 999, Direction.NORTH)

      expect(robot.turnRight()).to.eq(true)
      expect(robot.direction).to.eq(Direction.EAST)
    })

    it("from EAST is now facing SOUTH", () => {
      robot.place(table, 666, 999, Direction.EAST)

      expect(robot.turnRight()).to.eq(true)
      expect(robot.direction).to.eq(Direction.SOUTH)
    })

    it("from SOUTH is facing WEST", () => {
      robot.place(table, 666, 999, Direction.SOUTH)

      expect(robot.turnRight()).to.eq(true)
      expect(robot.direction).to.eq(Direction.WEST)
    })

    it("from WEST is facing NORTH", () => {
      robot.place(table, 666, 999, Direction.WEST)

      expect(robot.turnRight()).to.eq(true)
      expect(robot.direction).to.eq(Direction.NORTH)
    })
  })

  describe("report", () => {
    it("returns X coordinate", () => {
      robot.place(table, 666, 999, Direction.WEST)

      expect(robot.report().x).to.eq(666)
    })

    it("returns Y coordinate", () => {
      robot.place(table, 666, 999, Direction.WEST)

      expect(robot.report().y).to.eq(999)
    })

    it("returns direction", () => {
      robot.place(table, 666, 999, Direction.WEST)

      expect(robot.report().direction).to.eq(Direction.WEST)
    })

    it("returns initial values before placement", () => {
      expect(robot.report().x).to.eq(-1)
      expect(robot.report().y).to.eq(-1)
      expect(robot.report().direction).to.eq(undefined)
    })
  })

  describe("move", () => {
    it("NORTH succesfully", () => {
      robot.place(table, 4, 3, Direction.NORTH)
      robot.move(table)

      expect(robot.y).to.eq(4)
    })

    it("EAST succesfully", () => {
      robot.place(table, 4, 3, Direction.EAST)

      expect(robot.move(table)).to.eq(true)
      expect(robot.x).to.eq(5)
    })

    it("SOUTH succesfully", () => {
      robot.place(table, 4, 3, Direction.SOUTH)

      expect(robot.move(table)).to.eq(true)
      expect(robot.y).to.eq(2)
    })

    it("WEST succesfully", () => {
      robot.place(table, 4, 3, Direction.WEST)

      expect(robot.move(table)).to.eq(true)
      expect(robot.x).to.eq(3)
    })

    it("is ignored before placement", () => {
      expect(robot.move(table)).to.eq(false)
      expect(robot.x).to.eq(-1)
      expect(robot.y).to.eq(-1)
      expect(robot.report().direction).to.eq(undefined)
    })

    it("is ignored on invalid position", () => {
      robot.place(table, 4, 3, Direction.WEST)
      sinon.restore()
      sinon.stub(table, "isValidPosition").returns(false)

      expect(robot.move(table)).to.eq(false)
      expect(robot.x).to.eq(4)
      expect(robot.y).to.eq(3)
      expect(robot.report().direction).to.eq(Direction.WEST)
    })
  })
})
