const mongoose = require('mongoose');

// Use the URI from your .env file or the one that worked in debug-db.js
const uri = "mongodb+srv://geonixahrteam_db_user:geonixahrteam_db_user@cluster0.857kn8v.mongodb.net/lms?retryWrites=true&w=majority&appName=Cluster0";

async function updatePrices() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        const result = await mongoose.connection.db.collection('courses').updateMany(
            { $or: [{ price: { $exists: false } }, { price: 0 }, { price: null }] },
            { $set: { price: 2999 } }
        );

        console.log(`Updated ${result.modifiedCount} courses with default price 499`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

updatePrices();
