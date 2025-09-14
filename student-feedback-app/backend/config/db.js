const { MongoClient, ServerApiVersion } = require('mongodb');

let client;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 
    "mongodb+srv://meghanab235:meghana@cluster0.y90t791.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  if (client) return client; // reuse existing connection

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Connected to MongoDB!');
    return client;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

