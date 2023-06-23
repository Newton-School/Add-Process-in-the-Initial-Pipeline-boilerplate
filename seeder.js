const fs = require("fs");
const Process = require('./models/process.js');

async function seedWithDummyData() {
    try {
        // CLEAR Dawait Subject.deleteMany({});
        await Process.deleteMany({});
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
}

module.exports = seedWithDummyData