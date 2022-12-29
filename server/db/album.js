const Sequelize = require('sequelize');
const db = require('./db');

const Album = db.define('album', {
  name: {
    type: Sequelize.STRING
  },
  artworkUrl: {
    type: Sequelize.STRING,
    defaultValue: 'default-album.jpg'
  }
})

module.exports = Album;