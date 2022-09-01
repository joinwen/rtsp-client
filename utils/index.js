const net = require("net");
const checkPort = (port) => {
  let server = net.createServer();
  server.listen(port);
  return new Promise((resolve, reject) => {
    server.once("error", () => {
      reject(false);
    });
    server.once("listening", () => {
      server.close();
      resolve(true);
    });
  });
};

/**
 * extract " Response: RTSP/1.0 200 OK " into ["Response", ["RTSP/1.0", "200", "OK"]],
 * @param str
 * @returns {[string, string]}
 */
const extractLabelAndValues = (str) => {
  let res = /(\w+):\s*(.*?)\s*$/.exec(str),
    label = res[1],
    value = res[2];
  value = value.split(/\s+/);
  return [label, value];
};


const extractKeyAndValue = (str) => {
  let arr = str.split(","),
    obj = {};
  arr.forEach(str => {
    let kv = str.split("=");
    obj[kv[0].trim()] = kv[1].trim();
  });
  return obj;
};

const extractKeyAndValueBySeparator = (str, separator) => {
  separator = separator || ";";
  return str.split(separator);
};



module.exports = {
  checkPort,
  extractLabelAndValues,
  extractKeyAndValueBySeparator,
  extractKeyAndValue
};
