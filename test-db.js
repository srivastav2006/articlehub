const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    // Connect without deprecated options
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Define a simple test schema
    const TestSchema = new mongoose.Schema({
      message: String,
      createdAt: { type: Date, default: Date.now }
    });

    const Test = mongoose.model('Test', TestSchema);

    // Create a test document
    const testDoc = await Test.create({
      message: 'Database connection successful!'
    });

    console.log(`✅ Test document created:`, testDoc);

    // Clean up
    await Test.deleteOne({ _id: testDoc._id });
    console.log(`🧹 Test document cleaned up`);

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

testConnection();
