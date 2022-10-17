const express = require('express')
const morgan = require("morgan")
const mongoose = require("mongoose");
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use(morgan("combined"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// // Connect to DB
// const mongoURI = "mongodb+srv://koiirosora:0123456789@cluster0.imywx6q.mongodb.net/test";

// mongoose.connect(mongoURI, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// });

const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
"mongodb+srv://koiirosora:0123456789@cluster0.imywx6q.mongodb.net/test";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();



    // database and collection code goes here
    const db = client.db("sample_guides");
    const coll = db.collection("comets");
    const cursor = coll.find();
    await cursor.forEach(console.log)



    // database and collection code goes here
    // const db = client.db("sample_guides");
    // const coll = db.collection("comets");

// insert code goes here
    // const docs = [
    //   {name: "Halley's Comet", officialName: "1P/Halley", orbitalPeriod: 75, radius: 3.4175, mass: 2.2e14},
    //   {name: "Wild2", officialName: "81P/Wild", orbitalPeriod: 6.41, radius: 1.5534, mass: 2.3e13},
    //   {name: "Comet Hyakutake", officialName: "C/1996 B2", orbitalPeriod: 17000, radius: 0.77671, mass: 8.8e12}
    // ];
    // insert code goes here
    // const result = await coll.insertMany(docs);

// update code goes here
    const filter = { };
    const updateDoc = {
      $mul: {
          radius: 1.60934
      }
    };
    // update code goes here
    const result = await coll.updateMany(filter, updateDoc);
// delete code goes here 
    
    // const doc = {
    //   orbitalPeriod: {
    //     $gt: 5,
    //     $lt: 85
    //   }
    // };
    // delete code goes here
    // const result = await coll.deleteMany(doc);

    // display the results of your operation
    console.log(result.insertedIds);
    console.log("Number of documents updated: " + result.modifiedCount);
    console.log("Number of documents deleted: " + result.deletedCount);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);