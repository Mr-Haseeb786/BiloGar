const { connect } = require("mongoose");

async function connectToDB(url) {
  return connect(url);
}

module.exports = { connectToDB };
