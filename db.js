import { MongoClient } from "mongodb"
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI

const client = new MongoClient(uri) 

await client.connect()
let db = client.db('users')
let collection = db.collection('usersData')

async function addUser(fName, lName, email, password) {
  try{
    await collection.insertOne(
        {
            firstName:fName,
            lastName:lName, 
            email:email,
            password:password
        }
    )
  }catch(err){
    console.log(err);
  }
}

async function fetchUserData(email,password){
    try{
       return await collection.findOne(
            {
               email:email,
               password:password
            }
        )
    }catch(err){
        console.log(err)
    }
}


export {addUser,fetchUserData}