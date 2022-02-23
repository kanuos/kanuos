import { connect } from 'mongoose';

const {MONGO_URI} = process.env;

(function () {
    connect(MONGO_URI)
    .then(() => console.log('connected to DB'))
    .catch(() => {
        console.log(`Couldn't connect to DB server. Exiting ...`)
        process.exit(1)
    })
})()
