const mongoose = require('mongoose');

require('dotenv').config();

connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB is not connected');
        process.exit(1);
    }
}

module.exports = connectDB;