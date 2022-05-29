const typeorm = require('typeorm')



const database = async () => {

    let connection = await typeorm.
    createConnection();

    if(connection){
        console.log("Database is online")
    }
    return connection;
}

module.exports = database;