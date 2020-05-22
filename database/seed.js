/* eslint-disable no-plusplus */
const faker = require('faker');
var assert = require('assert');
var cassandra = require('cassandra-driver');
var authProvider = new cassandra.auth.PlainTextAuthProvider('root');
var contactPoints = ['127.0.0.1'];
var client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, keyspace:'carousel'});


db.once('open', () => {
  const imageDataSchema = new mongoose.Schema({
    gameTitle: String,
    newPrice: Number,
    preOwnedPrice: Number,
    digitalPrice: Number,
    mainImage: String,
    images: [String],
  });

  const ImageData = mongoose.model('ImageData', imageDataSchema);

  const randomMainImage = () => {
    const random = Math.floor(Math.random() * Math.floor(17) + 1);
    return `https://shmetsy.s3.us-east-2.amazonaws.com/${random}-170x170.jpg`;
  };

  const randomImages = () => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * Math.floor(29) + 1);
      result.push(`https://shmetsy.s3.us-east-2.amazonaws.com/${random}-370x370.jpg`);
    }
    return result;
  };

  const seed = (entrys) => {
    const allData = [];
    for (let i = 0; i < entrys; i++) {
      const data = {
        gameTitle: faker.name.title(),
        newPrice: 59.99,
        preOwnedPrice: 54.99,
        digitalPrice: 59.99,
        mainImage: randomMainImage(),
        images: randomImages(),
      };
      allData.push(data);
    }
    return allData;
    var query = 'INSERT INTO imageData (';
    var q1 = execute(query, ['oranges'], (err, result) => { assert.ifError(err); console.log('The cost per orange is $' + result.rows[0].price_p_item)});
    var q2 = execute(query, ['pineapples'], (err,result) => { assert.ifError(err); console.log('The cost per pineapple is $' + result.rows[0].price_p_item)});
    var q3 = execute(query, ['apples'], (err,result) => { assert.ifError(err); console.log('The cost per apple is $' + result.rows[0].price_p_item)});
    Promise.all([q1,q2,q3]).then(() => {
      console.log('exit');
      process.exit();
});
  };

  ImageData.deleteMany({}, (err) => {
    if (err) {
      console.log('Error Deleting Table', err);
    } else {
      console.log('Table Deleted');
    }
  });

  const allData = seed(100);

  ImageData.insertMany([...allData], (err) => {
    if (err) {
      console.log('Error Seeding', err);
    } else {
      db.close();
      console.log('Databse Is Seeded');
    }
  });
});
