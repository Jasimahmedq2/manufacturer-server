const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k3ork.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect()
    const groceryCollection = client.db('groceryManagment').collection('product');
    const addServiceCollection = client.db('groceryManagment').collection('service')

    app.get('/item', async (req, res) => {
      const query = {};
      const cursor = groceryCollection.find(query);
      const services = await cursor.toArray();
      res.send(services)
    })


    app.get('/item/:id', async (req, res) => {
      const id = req.params;
      console.log(id);
      const query = { _id: ObjectId(id) };
      console.log(query)
      const service = await groceryCollection.findOne(query);
      console.log(service)
      res.send(service);
    });

    //delete

    app.delete('/item/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await groceryCollection.deleteOne(query);
      res.send(result);
    });
    
    //  Post

    app.post('/order', async(req, res) => {
      const data = req.body;
      const result = await addServiceCollection.insertOne(data)
      res.send(result)
    })

    // get 

    app.get('/order', async(req, res) => {
      const email = req.query.email;
      console.log(email)
      const query = {email:email};
      const cursor = addServiceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })

    // delete

    app.delete('/order/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id:ObjectId(id)}
      const result = await addServiceCollection.deleteOne(query);
      res.send(result)
    })
   

    app.put('/item/:id', async (req, res) => {
      const id = (req.params.id)
      const updateNum = req.body;
      console.log(updateNum)
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };

      const updateProduct = {
          $set: {
              quantity: updateNum.quantityNum
          },
      };

      const result = await groceryCollection.updateOne(query, updateProduct, options);
      console.log(result);

      res.send(result);

  });

  }
  finally {

  }

}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('warehouse grocery managment')
});
app.listen(port, () => {
  console.log('JASIM AHMED', port)
}) 