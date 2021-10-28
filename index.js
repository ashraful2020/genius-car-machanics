const express = require("express");
const { MongoClient } = require('mongodb');
require("dotenv").config();
const cors = require('cors');
const port = 5000;
const app = express();

// middleWare
app.use(cors());
app.use(express.json());

// GET API 
app.get("/", (req, res) => {
  console.log('this is working');
  res.send("It's Working")
})

const uri = "mongodb+srv://geniusMechanic:uk1t58wFkWY2Lo8h@cluster0.wijwg.mongodb.net/Database?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
  try {
    await client.connect();
    const database = client.db("genius-mechanics");
    const userCollection = database.collection("user");

    // POST API 
    app.post('/services', async (req, res) => {
      const service = req.body;
      console.log('hit the post api', service);

      const result = await userCollection.insertOne(service);
      console.log(result);
      res.send('Send')
    });
  }
  finally {

  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log("Port no .", port);
})