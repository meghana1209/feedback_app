

const { MongoClient, ServerApiVersion } = require('mongodb');

const connectDB = async () => {
	const uri = mongodb+srv://meghanab235:meghana@cluster0.y90t791.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;
	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		}
	});
	try {
		await client.connect();
		await client.db('admin').command({ ping: 1 });
		console.log('Pinged your deployment. You successfully connected to MongoDB!');
	} catch (err) {
		console.error('❌ MongoDB connection error:', err.message);
		process.exit(1);
	} finally {
		await client.close();
	}
};

module.exports = connectDB;
