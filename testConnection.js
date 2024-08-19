const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://worldwidenews:WWN123@worldwidenews.8iikf.mongodb.net/mydatabase?retryWrites=true&w=majority';

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
  } catch (e) {
    console.error('Failed to connect:', e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
