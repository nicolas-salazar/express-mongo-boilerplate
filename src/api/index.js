const express = require('express');
const { getDbInstance } = require('../utils/dbTools');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'This is a message from the api 👋🌎',
  });
});

router.get('/guests', async (req, res) => {
  const { dbInstance, closeConnection } = await getDbInstance();
  const guests = await dbInstance.collection('guests').find({}).toArray();

  res.status(200).json(guests);
  closeConnection();
});

router.post('/guests', async (req, res) => {
  const { dbInstance, closeConnection } = await getDbInstance();
  try {
    await dbInstance.collection('guests').insert(req.body);
    res.status(201).json();
    closeConnection();
  } catch (error) {
    res.status(500).json();
  }
});

module.exports = router;
