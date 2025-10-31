const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
    	await mongoose.connect(process.env.DB_URI);
        console.log(`MONGODB IS CONNECTED ON HOST : ${mongoose.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDb;