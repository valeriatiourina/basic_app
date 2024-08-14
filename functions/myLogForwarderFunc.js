exports = async function(logs) {
/*
A Log Forwarder will always call a function with an array of logs.
Documentation on Log Forwarders: https://www.mongodb.com/docs/atlas/app-services/logs/forward-logs/

const response = await context.http.post({
  url: "https://www.this.is.a.example.destination.com/logs",
  body: logs,
  encodeBodyAsJSON: true
})
// The response body is a BSON.Binary object. Parse it and return.
return EJSON.parse(response.body.text());
*/
  return {result: logs.length}
};
