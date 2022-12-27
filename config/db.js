
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected`)
    } catch (error) {
        console.log(`MongoDB not connected`,error)
        process.exit(1)
    }
}

module.exports = connectDB