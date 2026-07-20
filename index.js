const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

// Create / Tambah Komik
app.post("/komik", async (req, res) => {
  const data = req.body;
  try {
    const komik = await db.komik.create(data);
    res.status(201).send(komik);  
  } catch (err) {
    res.status(500).send(err);
  }
});

