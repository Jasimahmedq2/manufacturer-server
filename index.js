const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k3ork.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log('uri', uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(process.env.DB_USER, process.env.DB_PASS)

async function run() {
  try{
     await client.connect()
     const groceryCollection = client.db('warehouse').collection('grocery')
     app.get('/item', async(req, res) => {
       const query = {};
       const cursor = groceryCollection.find(query);
       const items = await cursor.toArray();
       res.send(items)
     })
  }
  finally{

  }

}

run().catch(console.dir)





app.get('/', (req, res) => {
  res.send('warehouse grocery managment')
});
app.listen(port, () => {
  console.log('JASIM AHMED', port)
}) 