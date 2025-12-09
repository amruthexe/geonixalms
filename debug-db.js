const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function checkDb() {
    try {
        const envContent = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf8');
        // Extract URI base (before ?)
        const match = envContent.match(/MONGODB_URL=(.+?)(\?|\n|$)/);
        if (!match) {
            console.log("Could not find MONGODB_URL in .env");
            return;
        }
        let uri = match[1].trim();
        console.log("Base URI (masked):", uri.replace(/:([^:@]+)@/, ':****@'));

        const client = new MongoClient(uri, {
            tls: true,
            tlsAllowInvalidCertificates: true
        });

        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db();

        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));

        const userCount = await db.collection('user').countDocuments();
        console.log("Count in 'user':", userCount);

        const usersCount = await db.collection('users').countDocuments();
        console.log("Count in 'users':", usersCount);

        if (userCount > 0) {
            const sample = await db.collection('user').findOne();
            console.log("Sample from 'user':", sample);
        }
        if (usersCount > 0) {
            const sample = await db.collection('users').findOne();
            console.log("Sample from 'users':", sample);
        }

        await client.close();

    } catch (e) {
        console.error(e);
    }
}

checkDb();
