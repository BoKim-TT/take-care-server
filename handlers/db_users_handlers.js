const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//mongo client
const client = new MongoClient(MONGO_URI, options);

//register user by email sign up
const registerUser = async (req, res) => {
  const { email, token } = req.body;

  if (!token || !email) {
    return res.status(400).json({
      status: 400,
      data: req.body,
      message: ' request form is invalid',
    });
  }

  try {
    await client.connect();

    const db = client.db('medical_records');

    //check if there is aleady this email registered on the users collection
    const result = await db.collection('users').findOne({ email });

    //if so, send message of bad request
    if (result) {
      return res.status(400).json({
        status: 400,
        data: req.body,
        message: 'bad request : email already exist',
      });
    }
    // if not,
    if (!result) {
      const _id = uuidv4();

      // add a new user data on the users collection
      const insertedResult = await db
        .collection('users')
        .insertOne({ email: email, token: token, _id: _id });

      if (insertedResult.insertedId) {
        return res.status(200).json({
          status: 200,
          data: { token: _id },
          message: 'success',
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: 'request is not successfully added',
          data: req.body,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }

  client.close();
  console.log('closed');
};

// compare password and hashed token to check if this user is on the users Data
const signInUser = async (req, res) => {
  const { email, password } = req.body;

  // form validation
  if (!password || !email) {
    return res.status(400).json({
      status: 400,
      data: req.body,
      message: ' request form is invalid',
    });
  }

  try {
    await client.connect();

    const db = client.db('medical_records');

    const foundUser = await db.collection('users').findOne({ email });

    //if user's email exists, compare the password with bcrypt hashed token
    if (foundUser) {
      bcrypt.compare(password, foundUser.token, (err, result) => {
        if (result) {
          // if the result is true
          return res.status(200).json({
            status: 200,
            data: { token: foundUser._id },
            message: 'success',
          });
        } else {
          // if the result is false
          return res.status(400).json({
            status: 400,
            data: req.body,
            message: ' invalid password',
          });
        }
      });
    }

    //if user's email is not on the users collection
    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        data: req.body,
        message: 'email is not registered',
      });
    }
  } catch (err) {
    console.log(err);
  }

  client.close();
  console.log('closed');
};

const getUsers = async (req, res) => {
  try {
    await client.connect();

    const db = client.db('medical_records');

    const foundUser = await db.collection('users').find().toArray();
    if(foundUser){
      return res.status(200).json({data: foundUser})
    } else{
      return res.status(404).json({message: 'no user found'})
    }
  } catch (err) {
    console.log(err);
  }

  client.close();
  console.log('closed');
};
module.exports = { registerUser, signInUser, getUsers };
