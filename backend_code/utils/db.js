const { MongoClient, ObjectId } = require('mongodb');

// process.env.MONGODB_URI = 'mongodb://<classnamedata>:<password>@<endpoint>.documents.azure.com:10255/?ssl=true';
process.env.MONGODB_URI= 'mongodb://volunteer-datatest:tKeORjlo1Gd6ADD3QnHaq3P2QFWVegOb4JFWVsCOl8ke2wBcT4QfdhOFpcckADp1uoUB2JBt2A7mACDbk1cpjw==@volunteer-datatest.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@volunteer-datatest@';

// tKeORjlo1Gd6ADD3QnHaq3P2QFWVegOb4JFWVsCOl8ke2wBcT4QfdhOFpcckADp1uoUB2JBt2A7mACDbk1cpjw==
if (!process.env.MONGODB_URI) {
    
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
}

// Connect to MongoDB
async function connectToDB() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('DB');
    db.client = client;
    return db;
}

module.exports = { connectToDB, ObjectId };