const router = require('express').Router();
const { Album } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const albums = await Album.findAll({
      order: [['id', 'ASC']],
      include: 'artist'
    });
    res.json(albums);
  } catch (error) { next(error) };
});

router.get('/:albumId', async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.albumId, {
      include: ['artist', 'songs']
    });
    res.json(album);
  } catch (error) { next(error) };
});

module.exports = router;