const { MongoClient } = require("mongodb");
require('dotenv').config();


const connectionString = process.env.MONGODB_URI;
const dbName = 'fitness';

const db = {};

(async () => {
    try
    {
        const client = new MongoClient(connectionString, {

        });

        await client.connect();
        console.log('Connected to MongoDB Successfully.');

        // Select Database
        const database = client.db(dbName);

        // Assign Collection
        db.client = client;
        db.database = database;
        
        db.pages = database.collection('pages');
        db.blogs = database.collection('blogs');
        db.blogsCategory = database.collection('blogsCategory');
        db.form = database.collection('form');
        db.users = database.collection('users');
        db.MembershipPlanServices = database.collection('MembershipPlanServices');
        db.TrainingPlanServices = database.collection('TrainingPlanServices');
        db.MembershipPlans = database.collection('MembershipPlans');
        db.TrainigPlans = database.collection('TrainingPlans');

    }
    catch (error)
    {
        console.error('MongoDB Connection Error:', error);
    }
})();

module.exports = db;