const BaseException = require("../../exception/BaseException");
const Net = require("net");
const Url = require("url");

/**
 * generic-message = Request-Line / Status-Line
 *                   *(rtsp-header CRLF)
 *                   CRLF
 *                   [message-body-data]
 *
 * 1. general-header
 *   general-header may be used in both requests and responses
 *   headers listed in here:
 *      Accept-Ranges
 *      Cache-Control
 *      Connection
 *      CSeq
 *      Date
 *      Media-Properties
 *      Media-Range
 *      Pipelined-Requests
 *      Proxy-Supported
 *      Range
 *      RTP-Info
 *      Scale
 *      Seek-Style
 *      Server
 *      Session
 *      Speed
 *      Supported
 *      TimeStamp
 *      Transport
 *      User-Agent
 * 2. request-header
 *    request-header may be used in server to client or client to server
 *   2.1 Request Line
 *   <Method> SP <Request-URI> SP <RTSP-Version> CRLF
 *   methods list in here:
 *      DESCRIBE
 *      GET_PARAMETERS
 *      OPTIONS
 *      PAUSE
 *      PLAY
 *      PLAY_NOTIFY
 *      REDIRECT
 *      SET_PARAMETER
 *      TEARDOWN
 *   2.2 general-header
 *   2.3 request-header
 *   headers list in here:
 *      Accept
 *      Accept-Credentials
 *      Accept-Encoding
 *      Accept-Language
 *      Authorization
 *      Bandwidth
 *      Blocksize
 *      From
 *      If-Match
 *      If-Modified-Since
 *      If-None-Match
 *      Notify-Reason
 *      Proxy-Authorization
 *      Proxy-Require
 *      Referrer
 *      Request-Status
 *      Require
 *      Terminate-Reason
 *   2.4 message-body-header
 *   2.5
 * 3. response-header
 *   3.1 Status-Line
 *   <RTSP-Version> SP <Status-Code> SP <Reason Phrase> CRLF
 *   Status-Code list in here:
 *   1xx: Informational - Request received, continuous process
 *   2xx: The action was successfully received, understood, and accepted
 *   3rr: Further action need to be taken in order to complete the request (3rr rather than 3xx is used as 304 is excluded)
 *   4xx: Client Error - The request contains bad syntax or cannot be fulfilled
 *   5xx: Server Error - The server failed to fulfill an apparently valid request
 *   3.2 response-header
 *   headers list in here:
 *        Authentication-Info
 *        Connection-Credentials
 *        Location
 *        MTag
 *        Proxy-Authentication
 *        Public
 *        Retry-After
 *        Unsupported
 *        WWW-Authenticate
 *
 * 4. message-body-header
 *    headers list in here:
 *        Allow
 *        Content-Base
 *        Content-Encoding
 *        Content-Language
 *        Content-Length
 *        Content-Location
 *        Content-Type
 *        Expires
 *        Last-Modified
 * Notice:
 * 1. for robustness, client should ignore empty line(s) where a Request-Line / Status-Line
 * 2. the order in which header fields with differing field names are received is not significant
 *    it is good practice to send general-header fields first followed by a request-header or response-header
 *    and ending with message body header fields
 * 3. unknown message headers must be ignored
 * 4. if comma-separated list, don't change the order of field-values
 * 5. message body must be signaled by a Content-Length and Content-Type header
 * 6.
 */
class RTSPClient {
  constructor() {
    this.cseq = 1;
    this.socket = null;
    this.url = "";
  }
  connect(url) {
    if (this.socket)
      throw new BaseException("already connecting");
    this.url = Url.parse(url);
    return new Promise((resolve, reject) => {
      try {
        const options = {
          host: this.url.hostname,
          port: this.url.port || 554
        };
        console.log(options);
        this.socket = Net.connect(options);
        this.socket.setNoDelay(true);
        this.socket.on("connect", () => {
          resolve();
        });
        this.socket.on("timeout", () => {
          // timeout should be closed!
        });
        this.socket.on("error", (e) => {
          reject(e);
        });

        this.socket.on("data", (buffer) => {
          // received buffer
          console.log(buffer);
        });
      }catch (e) {
        reject(e);
      }
    });
  }

  options() {
    let str = "Request: OPTIONS rtsp://192.168.18.243:554/h264/ch1/main/av_stream RTSP/1.0\r\nCSeq: 1\r\nUser-Agent: flywen\r\n\r\n";
    this.socket.write(str);
  }
  describe() {

  }
  setup() {

  }
  play() {

  }

  setSession(sessionId) {
    this.sessionId = sessionId;
  }
}
module.exports = RTSPClient;
