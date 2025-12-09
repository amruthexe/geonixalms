const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || "mongodb+srv://geonixahrteam_db_user:geonixahrteam_db_user@cluster0.857kn8v.mongodb.net/lms?retryWrites=true&w=majority&appName=Cluster0";

async function checkCourses() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        const courses = await mongoose.connection.db.collection('courses').find({}).toArray();
        console.log("Courses found:", courses.length);

        courses.forEach(c => {
            console.log(`Course: ${c.title}, Price: ${c.price}, ID: ${c._id}`);
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

checkCourses();
