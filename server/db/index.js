const db = require('./db');
// require each of your models here...
const Album = require('./album');
const Artist = require('./artist');
const Song = require('./song');

// ...and give them some nice associations here!
Song.belongsTo(Album, { as: 'album' });
Album.hasMany(Song, { as: 'songs' });
Song.belongsTo(Artist, { as: 'artist' });
Artist.hasMany(Song, { as: 'songs' });
Album.belongsTo(Artist, { as: 'artist' });
Artist.hasMany(Album, { as: 'albums' });

module.exports = {
  db,
  // Include your models in your module.exports as well!
  // The seed file expects to find them there!
  Album,
  Artist,
  Song
}
