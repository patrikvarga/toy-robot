import { expect } from "chai";
import Robot, { Direction } from "./robot";
import Table from "./table";
import sinon, { SinonMock } from "sinon";

describe("robot", () => {

  let table: Table;
  let robot: Robot;

  beforeEach(() => {
    table = new Table(1, 1);
    robot = new Robot();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("creation", () => {
    it("does not set X coordinate", () => {
      expect(robot.x).to.eq(-1);
    });

    it("does not set Y coordinate", () => {
      expect(robot.y).to.eq(-1);
    });

    it("does not set direction", () => {
      expect(robot.direction).to.eq(undefined);
    });
  });

  describe("placement", () => {
    it("is ignored on invalid table coordinates", () => {
      sinon.stub(table, "isValidPosition").returns(false);

      expect(robot.place(table, 666, 999, Direction.EAST)).to.eq(false);
    });

    it("is accepted on valid table coordinates", () => {
      sinon.stub(table, "isValidPosition").returns(true);

      expect(robot.place(table, 666, 999, Direction.EAST)).to.eq(true);
    });

    it("sets robot's X coordinate when accepted", () => {
      sinon.stub(table, "isValidPosition").returns(true);

      robot.place(table, 666, 999, Direction.EAST)
      expect(robot.x).to.eq(666);
    });

    it("sets robot's Y coordinate when accepted", () => {
      sinon.stub(table, "isValidPosition").returns(true);

      robot.place(table, 666, 999, Direction.EAST)
      expect(robot.y).to.eq(999);
    });

    it("sets robot's direction when accepted", () => {
      sinon.stub(table, "isValidPosition").returns(true);

      robot.place(table, 666, 999, Direction.EAST)
      expect(robot.direction).to.eq(Direction.EAST);
    });
  });

  describe("turning left", () => {
    beforeEach(() => {
      sinon.stub(table, "isValidPosition").returns(true);
    });

    it("from NORTH is now facing WEST", () => {
      robot.place(table, 666, 999, Direction.NORTH)

      expect(robot.turnLeft()).to.eq(true);
      expect(robot.direction).to.eq(Direction.WEST);
    });

    it("from EAST is now facing NORTH", () => {
      robot.place(table, 666, 999, Direction.EAST)

      expect(robot.turnLeft()).to.eq(true);
      expect(robot.direction).to.eq(Direction.NORTH);
    });

    it("from SOUTH is facing EAST", () => {
      robot.place(table, 666, 999, Direction.SOUTH)

      expect(robot.turnLeft()).to.eq(true);
      expect(robot.direction).to.eq(Direction.EAST);
    });

    it("from WEST is facing SOUTH", () => {
      robot.place(table, 666, 999, Direction.WEST)

      expect(robot.turnLeft()).to.eq(true);
      expect(robot.direction).to.eq(Direction.SOUTH);
    });
  });

  describe("turning right", () => {
    beforeEach(() => {
      sinon.stub(table, "isValidPosition").returns(true);
    });

    it("from NORTH is now facing EAST", () => {
      robot.place(table, 666, 999, Direction.NORTH)

      expect(robot.turnRight()).to.eq(true);
      expect(robot.direction).to.eq(Direction.EAST);
    });

    it("from EAST is now facing SOUTH", () => {
      robot.place(table, 666, 999, Direction.EAST)

      expect(robot.turnRight()).to.eq(true);
      expect(robot.direction).to.eq(Direction.SOUTH);
    });

    it("from SOUTH is facing WEST", () => {
      robot.place(table, 666, 999, Direction.SOUTH)

      expect(robot.turnRight()).to.eq(true);
      expect(robot.direction).to.eq(Direction.WEST);
    });

    it("from WEST is facing NORTH", () => {
      robot.place(table, 666, 999, Direction.WEST)

      expect(robot.turnRight()).to.eq(true);
      expect(robot.direction).to.eq(Direction.NORTH);
    });
  });

});
