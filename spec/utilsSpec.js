const { checkPort } = require("../utils/index");
const RTSPClient = require("../core/client/index");
const Url = require("url");
describe("Utils Test", function() {
  it("checkPort", async function() {
    let res = await checkPort(20001);
    expect(res).toEqual(true);
  });
  it("test Url", function() {
    let res = Url.parse("rtsp://play():@f35guiniao@@192.168.18.243:554/h264/ch1/main/av_stream")
    console.log(res);
  });
});
describe("RTSPClient", function() {
  let client = new RTSPClient();
  it("connect", async function() {
    try {
      await client.connect("rtsp://play():@f35guiniao@@192.168.18.243:554/h264/ch1/main/av_stream");
      console.log("连接成功");
      client.options();
      console.log("发送 options 成功");
    }catch (error) {
      console.log("连接失败");
    }
  });
  it("options", async function() {
  });
});
