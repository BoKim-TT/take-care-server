const express = require('express');
const config = require('./config.js')
const cors = require('cors')

//api handlers
const { getMedInfo, getLabInfo, getNews } = require('./handlers/api_handlers');

// meds-records data handlers
const {
  postMedRecord,
  getMedRecords,
  getAMedRecord,
  deleteMedRecord,
  updateMedRecord,
} = require('./handlers/db_meds_handlers');

// labs-records data handlers
const {
  getLabRecords,
  postLabRecord,
  getALabRecord,
  updateLabRecord,
  deleteLabRecord,
} = require('./handlers/db_lab_handlers');

// users data handlers
const { registerUser, signInUser } = require('./handlers/db_users_handlers');

express()

  .use(express.json())
  .use(express.static('public'))
  .use(cors({
    optionsSuccessStatus: 200,
    credentials:true,
  }))

  // MEDIASTACK API (for Health news fetch on the Homepage)
  .get('/api/news', getNews)

  // MEDLINEPLUS Drug Code Requests API 
  .post('/api/med-info', getMedInfo)

   // MEDLINEPLUS Lab Test Code Requests API 
  .post('/api/lab-info', getLabInfo)

  // User endpoing (signUp with email  && signIn with email)
  .post('/data/user/signIn', signInUser)
  .post('/data/user/signUp', registerUser)

  // med-records endpoint
  .get('/data/med-records/:user', getMedRecords)
  .get('/data/med-records/:user/:_id', getAMedRecord)
  .post('/data/med-records/:user', postMedRecord)
  .patch('/data/med-records/:user/:_id', updateMedRecord)
  .delete('/data/med-records/:user/:_id', deleteMedRecord)

  // lab-records endpoint
  .get('/data/lab-records/:user', getLabRecords)
  .get('/data/lab-records/:user/:_id', getALabRecord)
  .post('/data/lab-records/:user', postLabRecord)
  .patch('/data/lab-records/:user/:_id', updateLabRecord)
  .delete('/data/lab-records/:user/:_id', deleteLabRecord)

  .get('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'This is obviously not what you are looking for.',
    });
  })

  .listen(config.host.port, () => {
    console.log(`port ${config.host.port}`);
  });
