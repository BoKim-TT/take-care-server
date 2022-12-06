require('dotenv').config();
const express = require('express');
const cors = require('cors');

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
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

// MEDIASTACK API (for Health news fetch on the Homepage)
app.get('/api/news', getNews);

// MEDLINEPLUS Drug Code Requests API
app.post('/api/med-info', getMedInfo);

// MEDLINEPLUS Lab Test Code Requests API
app.post('/api/lab-info', getLabInfo);

// User endpoing (signUp with email  && signIn with email)
app.post('/data/user/signIn', signInUser);
app.post('/data/user/signUp', registerUser);


// med-records endpoint
app.get('/data/med-records/:user', getMedRecords);
app.get('/data/med-records/:user/:_id', getAMedRecord);
app.post('/data/med-records/:user', postMedRecord);
app.patch('/data/med-records/:user/:_id', updateMedRecord);
app.delete('/data/med-records/:user/:_id', deleteMedRecord);

// lab-records endpoint
app.get('/data/lab-records/:user', getLabRecords);
app.get('/data/lab-records/:user/:_id', getALabRecord);
app.post('/data/lab-records/:user', postLabRecord);
app.patch('/data/lab-records/:user/:_id', updateLabRecord);
app.delete('/data/lab-records/:user/:_id', deleteLabRecord);

app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'This is obviously not what you are looking for.',
  });
});

app.listen(PORT, () => {
  console.log(`server is starting at  ${PORT}`);
});
