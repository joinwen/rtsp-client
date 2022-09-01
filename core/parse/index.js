const BaseException = require("../../exception/BaseException");
const {extractKeyAndValue} = require("../../utils");
const {extractLabelAndValues} = require("../../utils");

class Message {
  constructor(msg) {
    this.msg = msg;
    this.splitor = "\r\n";
    this.json = {};
  }
  static stringifyOptions() {

  }
  splitMessage() {
    return this.msg.split(this.splitor);
  }
  parseOptions() {
    if(!this.msg)
      throw new BaseException("message is blank");
    this.messages = this.splitMessage();
    this._parseResponse();
    this._parseCSeq();
  }
  _parseResponse() {
    let responseStr = this.messages[0];
    let [label, values] = extractLabelAndValues(responseStr);
    this.json[label] = {
      protocol: values[0],
      code: values[1],
      status: values[2]
    };
  }
  _parseCSeq() {
    let CSeqStr = this.messages[1];
    let [label, values] = extractLabelAndValues(CSeqStr);
    this.json[label] = values[0];
  }
  _parsePublic() {
    let publicStr = this.messages[2];
    let [label, values] = extractLabelAndValues(publicStr);
    this.json[label] = values[0];
  }
  _parseDate() {
    let dateStr = this.messages[3];
    let [label, values] = extractLabelAndValues(dateStr);
    this.json[label] = [...values].join(" ");
  }

  stringifyDescribe() {

  }

  parseDescribe() {
    if(!this.msg)
      throw new BaseException("message is blank");
    this.messages = this.splitMessage();
    this._parseResponse();
    this._parseCSeq();
    this._parseWWWAuth();
    this._parseDate();
  }
  _parseWWWAuth() {
    let wwwAuthStr = this.messages[2];
    let [label, values] = extractLabelAndValues(wwwAuthStr),
      method = [...values].shift(),
      obj = extractKeyAndValue([...values].join(" "));
    this.json[label] = {
      method,
      ...obj
    };
  }



  stringifySetup() {

  }
  parseSetup() {
    if(!this.msg)
      throw new BaseException("message is blank");
    this.messages = this.splitMessage();
    this._parseResponse();
    this._parseCSeq();
    this._parseSession();
    this._parseDate();
  }
  _parseSession() {

  }

  stringifyPlay() {

  }
  parsePlay() {

  }
}
module.exports = Message;
