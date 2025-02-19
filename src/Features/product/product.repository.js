import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import { type } from "os";
import { get } from "http";
export default class ProductRepository {
    async getAll() {
        try {
            let db = await getDb();
            let collection = db.collection('products');
            // return await collection.find().project({sizes:{$slice : 3},price:1,name:1,_id:0,ratings:1}).toArray();
            return await collection.find().sort({price:1}).toArray();
        } catch (err) {
            console.log(err)
        }
    }
    async addProduct(new_product) {
        try {
            let db = await getDb();
            let collection = db.collection('products');
            return await collection.insertOne(new_product);
        } catch (err) {
            console.log(err);
        }
    }
    async oneProduct(id) {
        try {
            let db = await getDb();
            let collection = db.collection('products');
            return await collection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.log(err);
        }
    }
    async rate(user_id, product_id, rating) {
        
        try {
            let db = await getDb();
            let collection = db.collection('products');
            // 1. find product using productid
            let product = await collection.findOne({ _id: new ObjectId(product_id)});

            // 2.cheking is product exist or not using ? then checking if product have ratings array or not using ? then finding the rating object with matches the product id and userid
            const userRating = product?.ratings?.find((rating) => {
                return rating.user_id == user_id
            })
             
            if (userRating) {
                return await collection.updateOne({
                    _id: new ObjectId(product_id),
                    "ratings.user_id": user_id
                }, {
                    $set: { "ratings.$.rating": rating }
                })
            } else {
                return await collection.updateOne(
                    { _id : new ObjectId(product_id) },
                    {
                        $push: {
                            "ratings": {
                                user_id: user_id,
                                rating: rating
                            }
                        }
                    });
            }

        } catch (err) {
            console.log(err);
        }
    }

    async filter(filter) {
        try {
            let db = await getDb();
            let collection = db.collection('products');
            // return await collection.find(filter).project({name:1,price:1,rating:1}).toArray();
            return await collection.find(filter).toArray();
        } catch (err) {
            console.log(err);
        }
    }

    async averagePricePerCategory(){
        try {
            let db =  await getDb();
            return await db.collection('products').aggregate([
                {
                    $group:{_id : "$category" , averagePrice : {$avg : "$price"}}
                }
            ]).toArray()
            
        } catch (error) {
            console.log(error)
        }
    }
}