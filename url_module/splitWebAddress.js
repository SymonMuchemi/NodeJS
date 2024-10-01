// splits a web address
const url = require('url');

const address = 'http://localhost:8080/default.htm?year=2017&month=February';
const query = url.parse(address, true);

console.log(query.host);
console.log(query.pathname);
console.log(query.search);

const queryData = query.query;

console.log(Object.prototype.toString.call(queryData));
console.log(queryData);
console.log(queryData.month);
