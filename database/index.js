import { createConnection, connections } from 'mongoose';

const {MONGO_URI} = process.env;


console.log("total connection : " ,connections.length)
console.log("connections : " ,connections.map(c => c.name))

let conn;

const existingConn = connections[1];

if (existingConn?.readyState) {
    conn = existingConn;
}
else {
    conn = createConnection(MONGO_URI, { maxPoolSize : 25})
}


export default conn;
