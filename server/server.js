require('newrelic');
const express = require('express');
const db = require('../database/database.js');


const app = express();
const PORT = 3003;

app.use('/games/:gameId', express.static(`${__dirname}/../public`));
app.use(express.json());

app.get('/carousel/:gameId', (req, res) => {
  db.getGameForTopCarousel(req.params.gameId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).end();
    } else {
      console.log(result.rows[0]);
      res.status(200).send(result.rows[0]);
    }
  });
});

// app.delete('/carousel/:gameId', (req, res) => {
//   db.deleteGameForTopCarousel(req.params.gameId, (err, result) => {
//     if (err) {
//       res.status(404).end();
//     } else {
//       res.status(200).send(result);
//     }
//   });
// });

// app.put('/carousel/:gameId', (req, res) => {
//   db.editGameForTopCarousel(req.params.gameId, (err, result) => {
//     if (err) {
//       res.status(404).end();
//     } else {
//       res.status(200).send(result);
//     }
//   });
// });


app.post('/carousel/:gameId', (req, res) => {
  // db.addGameForTopCarousel(req.params.gameId, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(404).end();
  //   } else {
  //     res.status(200).send(result);
  //   }
  // });

  const dummyPost = {Hello: 'World'}
  res.status(200).send(dummyPost);
});

app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});
