const fs = require('fs');
const path = require('path');
const faker = require('faker');
// const csvWriter = require('csv-write-stream');

const writePath = path.join(__dirname, '/../data.csv');
const writeUsers = fs.createWriteStream(writePath);
writeUsers.write('gameTitle, newPrice, preOwnedPrice, digitalPrice, mainImage, images\n', 'utf8');

function generator(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      const data = `"${faker.name.title()}", 59.99, 54.99, 59.99, "${randomMainImage()}", \[${randomImages()}\]\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
write()
}

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

generator(writeUsers, 'utf-8', () => {
  writeUsers.end();
});