import { expect } from "chai";
import Table from "./table";

describe("table", () => {

  describe("creation", () => {
    describe("fails", () => {
      it("for negative X", () => {
        expect(() => new Table(-1, 1)).to.throw("Invalid parameters: width=-1, height=1");
      });

      it("for negative Y", () => {
        expect(() => new Table(1, -1)).to.throw("Invalid parameters: width=1, height=-1");
      });

      it("for zero X", () => {
        expect(() => new Table(0, 1)).to.throw("Invalid parameters: width=0, height=1");
      });

      it("for zero Y", () => {
        expect(() => new Table(1, 0)).to.throw("Invalid parameters: width=1, height=0");
      });
    });

    describe("succeeds", () => {
      it("on positive X and Y", () => {
        expect(() => new Table(1, 1)).to.not.throw();
      });

      it("on a greater positive X and Y", () => {
        expect(() => new Table(4, 3)).to.not.throw();
      });
    });

    describe("rounds", () => {
      it("down a non-integer X", () => {
        expect(new Table(4.4, 3).width).to.eq(4);
      });

      it("up a non-integer X", () => {
        expect(new Table(4.6, 3).width).to.eq(5);
      });

      it("down a non-integer Y", () => {
        expect(new Table(4, 3.4).height).to.eq(3);
      });

      it("up a non-integer Y", () => {
        expect(new Table(4, 3.5).height).to.eq(4);
      });
    });
  });

  describe("position", () => {
    // table is stateless other than size, no need for beforeEach()
    const table4x3 = new Table(4, 3);

    describe("is invalid", () => {
      it("for negative X", () => {
        expect(table4x3.isValidPosition(-1, 1)).to.eq(false);
      });

      it("for negative Y", () => {
        expect(table4x3.isValidPosition(1, -1)).to.eq(false);
      });

      it("for X just outside boundary", () => {
        expect(table4x3.isValidPosition(4, 1)).to.eq(false);
      });

      it("for Y just outside boundary", () => {
        expect(table4x3.isValidPosition(1, 3)).to.eq(false);
      });

      it("for X way outside boundary", () => {
        expect(table4x3.isValidPosition(40, 1)).to.eq(false);
      });

      it("for Y way outside boundary", () => {
        expect(table4x3.isValidPosition(1, 30)).to.eq(false);
      });
    });

    describe("is valid", () => {
      it("for X and Y inside boundaries", () => {
        expect(table4x3.isValidPosition(1, 1)).to.eq(true);
      });

      it("for X on boundary", () => {
        expect(table4x3.isValidPosition(3, 1)).to.eq(true);
      });

      it("for Y on boundary", () => {
        expect(table4x3.isValidPosition(1, 2)).to.eq(true);
      });
    });
  });
});
