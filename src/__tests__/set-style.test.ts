import { stringifyStyle } from "../index";

describe("render style", () => {
  it("ms prefix", () => {
    const style = stringifyStyle({
      msTransform: "none"
    });
    expect(style).toEqual(`-ms-transform:none`);
  });

  it("webkit prefix", () => {
    const style = stringifyStyle({
      webkitOverflowScrolling: "touch"
    });
    expect(style).toEqual(`-webkit-overflow-scrolling:touch`);
  });

  it("complex border-left", () => {
    const style = stringifyStyle({
      borderLeft: "1px solid rgba(0, 0, 0, 0.2)"
    });
    expect(style).toEqual("border-left:1px solid rgba(0, 0, 0, 0.2)");
  });
});
