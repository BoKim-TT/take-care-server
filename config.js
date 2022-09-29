require('dotenv').config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`key ${key} is undefined`);
  }
  return value;
}

module.exports = {
  mongo: {
    uri: required('MONGO_URI'),
  },
  newsAPI: {
    accessKey: required('NEWS_ACCESS_KEY'),
  },

  host: {
    port: parseInt(required('PORT', 8000)),
  },
};
