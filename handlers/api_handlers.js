// const config = require('../config.js')
const axios = require('axios')
require('dotenv').config();

// MEDIASTACK API (for Health news fetch on the Homepage)
const getNews = async (req, res) => {

  const params = {
    access_key: process.env.NEWS_ACCESS_KEY,
    categories: 'health',
    languages: 'en',
  };
  try {
    const response = await axios.get('http://api.mediastack.com/v1/news', {
      params,
    });

    res.status(200).json({ status: 200, data: response.data.data });
  } catch (err) {
    console.log(err);
  }
};


// MEDLINEPLUS Drug Code Requests API
const getMedInfo = async (req, res) => {
  const { name, form } = req.body;

  try {
    const data = await axios.get(
      `https://connect.medlineplus.gov/service?mainSearchCriteria.v.cs=2.16.840.1.113883.6.69&mainSearchCriteria.v.dn=${name}&informationRecipient.languageCode.c=en&knowledgeResponseType=application/json`
    );

    res.status(200).json({ status: 200, data: data.data });
  } catch (err) {
    console.log(err);
  }
};


// MEDLINEPLUS Lab Test Code Requests API
const getLabInfo = (req, res) => {
  const { test } = req.body;
  // hardcoded LOINC code : could not find apis to get this codes by lab test area
  const LOINC_code = {
    Hemoglobin_A1C: ' 4548-4',
    Cholesterol_HDL: '2085-9',
    Cholesterol_LDL: '18261-8',
    CBC: '58410-2',
    WBC: '6690-2',
    TSH: 'LP14487-0',
    VitaminD: '35365-6',
    Blood_pressure: '55284-4',
    Insulin: '20448-7',
  };

  const term = LOINC_code[test];

  try {
    axios
      .get(
        `https://connect.medlineplus.gov/service?mainSearchCriteria.v.cs=2.16.840.1.113883.6.1&mainSearchCriteria.v.c=${term}&informationRecipient.languageCode.c=en&knowledgeResponseType=application/json`
      )
      .then((response) => {
        res.status(200).json({ status: 200, data: response.data });
      });
  } catch (err) {
    console.log(err);
  }
};


module.exports = { getMedInfo, getLabInfo, getNews };
