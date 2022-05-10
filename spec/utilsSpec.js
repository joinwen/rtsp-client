const { checkPort } = require("../utils/index");
describe("Utils Test", function() {
  it("checkPort", async function() {
    let res = await checkPort(20001);
    expect(res).toEqual(true);
  });
});
