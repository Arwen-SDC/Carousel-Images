const cassandra = require('cassandra-driver');
const distance = cassandra.types.distance;
const faker = require('faker');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'carousel'
  });


const getGameForTopCarousel = (id, callback) => {
    console.log('yo dawg I heard you like queries')
    const query = `SELECT * from imageData WHERE id = ${id};`;
    client.execute(query)
    .catch(error => {
        callback(error, null);
       })
    .then(result => {
         return callback(null, result);
        });

};

const addGameForTopCarousel = (id, callback) => {
  const query =  `INSERT INTO imageData (digital_price) VALUES (5.99)`
  client.execute(query)
  .catch(error => {
      callback(error, null);
     })
  .then(result => {
       return callback(null, result);
      });

}

const randomMainImage = () => {
  const random = Math.floor(Math.random() * Math.floor(17) + 1);
  return `https://shmetsy.s3.us-east-2.amazonaws.com/${random}-170x170.jpg`;
};

const randomImages = () => {
  const result = [];
  for (let i = 0; i < 5; i += 1) {
    const random = Math.floor(Math.random() * Math.floor(29) + 1);
    result.push(`https://shmetsy.s3.us-east-2.amazonaws.com/${random}-370x370.jpg`);
  }
  return result;
};


module.exports = {
  getGameForTopCarousel,
  addGameForTopCarousel
}