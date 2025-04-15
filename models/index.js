const { MongoClient } = require("mongodb");
require('dotenv').config();



const connectionString = process.env.MONGODB_URI;
const dbName = 'fitness';

const db = {};

(async () => {
    try {
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
        db.TrainingPlans = database.collection('TrainingPlans');
        db.Success_Stories = database.collection('Success_Stories');
        db.About_Me = database.collection('About_Me');
        db.Strategy_Plans = database.collection('Strategy_Plans');
        db.Products = database.collection('Products');
        db.Products_Category = database.collection('Products_Category');
        db.Products_Sizes = database.collection('Products_Sizes');
        db.Products_Color = database.collection('Products_Color');
        db.Product_Variants = database.collection('Product_Variants');
        db.user_cart = database.collection('user_cart');
        db.orders = database.collection('orders');
        db.transactions = database.collection('transactions');

    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
})();

module.exports = db;