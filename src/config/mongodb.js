import { MongoClient } from "mongodb";
let client = new MongoClient(process.env.DB_URL);

// Function to connect to MongoDB
export default async () => {
  try {
    await client.connect();
    await userDefineIds();
    await createIndexes();
    console.log("MongoDB is connected");
    console.log("user define ids is created");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

// Function to get the database instance
export let getDb = async () => {
  return await client.db("e-com"); // Return the "e-com" database
};


export let getClient = () =>{
  return client;
}

// function to create userDefineIds collection
let userDefineIds = async () => {
  try {
    let db = await getDb();
    let response = await db
      .collection("userDefineIds")
      .findOne({ _id: "cartCollectionId" });
    if (!response) {
      await db
        .collection("userDefineIds")
        .insertOne({ _id: "cartCollectionId", value: 0 });
    }
  } catch (err) {
    console.log(err);
  }
};

let createIndexes = async () => {
  try {
    let db = await getDb();
    let collection = await db.collection("products");
    // await collection.createIndex({ price: 1 });
    // await collection.createIndex({name : 'text' , desc : 'text'})
  } catch (err) {
    console.log(err);
  }
}