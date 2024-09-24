const mongoose = require('mongoose')

const clientOptions = {
    dbName : 'apinode'
}

exports.initClientDbConnection = async () => {
    try {
        
        if (!process.env.URL_MONGO) {
            throw new Error('MongoDB connection URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw error
    }
}

exports.closeConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
};