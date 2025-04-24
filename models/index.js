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
        db.blogs_category = database.collection('blogs_category');
        db.form = database.collection('form');
        db.users = database.collection('users');
        db.membership_plan_services = database.collection('membership_plan_services');
        db.training_plan_services = database.collection('training_plan_services');
        db.membership_plans = database.collection('membership_plans');
        db.training_plans = database.collection('training_plans');
        db.success_stories = database.collection('success_stories');
        db.about_me = database.collection('about_me');
        db.strategy_plans = database.collection('strategy_plans');
        db.products = database.collection('products');
        db.products_category = database.collection('products_category');
        db.products_sizes = database.collection('products_sizes');
        db.products_color = database.collection('products_color');
        db.product_variants = database.collection('product_variants');
        db.user_cart = database.collection('user_cart');
        db.orders = database.collection('orders');
        db.transactions = database.collection('transactions');
        db.nutrition_advisor = database.collection('nutrition_advisor');
        db.videos = database.collection('videos');

    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
})();

module.exports = db;