const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');
// const config = require('../config.js');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

//get all lab records
const getLabRecords = async (req, res) => {
  const user = req.params.user;

  // when there is no params of user
  if (user === 'undefined') {
    return res.status(404).json({ status: 404, message: 'user undefined' });
  }
  try {
    await client.connect();

    const db = client.db('medical_records');
    const result = await db.collection('labs').findOne({ user: user });

    // if user's records exists
    if (result) {
      return res.status(200).json({
        status: 200,
        data: result.records,
        message: 'success',
      });
    } else {
      // if there is no records under user
      return res.status(404).json({ status: 404, message: 'no records found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error });
  }

  client.close();
  console.log('closed');
};

// get a lab record
const getALabRecord = async (req, res) => {
  const { user, _id } = req.params;

  try {
    await client.connect();

    const db = client.db('medical_records');
    const result = await db.collection('labs').findOne({ user });
    const record = result.records.find((record) => record._id === _id);

    // if user's records exists
    if (record) {
      return res.status(200).json({
        status: 200,
        data: record,
        message: 'success',
      });
    } else {
      return res.status(404).json({ status: 404, message: 'no data found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error });
  }

  client.close();
  console.log('closed');
};

//add a lab record
const postLabRecord = async (req, res) => {
  const user = req.params.user;
  const { date, testArea, testResult } = req.body;

  // form validation check
  if (!user) {
    return res.status(400).json({
      status: 400,
      data: req.body,
      message: ' request form is invalid',
    });
  }

  try {
    await client.connect();

    const db = client.db('medical_records');
    const _id = uuidv4();
    const findOne = await db.collection('labs').findOne({ user: user });

    // if users's data exists, update with a new record
    if (findOne) {
      const result = await db
        .collection('labs')
        .updateOne(
          { user: user },
          { $push: { records: { ...req.body, _id } } }
        );

      if (result.modifiedCount === 1) {
        return res.status(200).json({
          status: 200,
          data: { ...req.body, _id },
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

    // if there is no users's data, make a new one
    if (!findOne) {
      const result = await db
        .collection('labs')
        .insertOne({ user: user, records: [{ ...req.body, _id }] });

      if (result.insertedId) {
        return res.status(200).json({
          status: 200,
          data: { ...req.body, _id },
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error });
  }

  client.close();
  console.log('closed');
};

//update a lab record
const updateLabRecord = async (req, res) => {
  const { user, _id } = req.params;
  const {
    date,
    laboratoryName,
    prescriber,
    testArea,
    testResult,
    comment,
    fileName,
    fileURL,
  } = req.body;

  //form validation check
  if (!_id || !user) {
    return res.status(400).json({
      status: 400,
      data: req.body,
      message: ' request form is invalid',
    });
  }

  try {
    await client.connect();

    const db = client.db('medical_records');

    // update user's single record
    const result = await db
      .collection('labs')
      .updateOne(
        { user: user, 'records._id': _id },
        { $set: { 'records.$': req.body } }
      );

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ status: 200, data: req.body, message: 'success' });
    } else {
      return res.status(400).json({
        status: 400,
        message: 'request is not successfully updated',
        data: req.body,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error });
  }
  client.close();
};

//delete a lab record
const deleteLabRecord = async (req, res) => {
  const { user, _id } = req.params;

  try {
    await client.connect();
    const db = client.db('medical_records');

    // delete user's single record
    const result = await db
      .collection('labs')
      .updateOne({ user: user }, { $pull: { records: { _id: _id } } });

    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ status: 200, data: result, message: 'record deleted.' });
    } else {
      return res.status(404).json({
        status: 404,
        data: result,
        message: 'record not deleted',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500, message: err });
  }

  client.close();
};

module.exports = {
  getLabRecords,
  postLabRecord,
  getALabRecord,
  deleteLabRecord,
  updateLabRecord,
};
