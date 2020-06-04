/* eslint-disable quotes */
const fs = require('fs');
const path = require('path');
const faker = require('faker');
// const csvWriter = require('csv-write-stream');

const writePath = path.join(__dirname, '/../data2.csv');
const writeUsers = fs.createWriteStream(writePath);
writeUsers.write('id|digital_price|game_title|images|main_image|new_price|preowned_price\n', 'utf8');

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

function generator(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  let written = 0;
  let bar = "║░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░║";
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = `${id}|59.99|"${faker.name.title()}"|{${randomImages()}}|"${randomMainImage()}"|59.99|54.99\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
        written += data.length;
        if (i % 100000 === 0) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          const percent = String(Math.floor((written / 3991608992) * 100));
          if (percent % 3 === 0) {
            bar = bar.replace('░', '▓');
          }
          process.stdout.write(bar + '     ');
          process.stdout.write(percent + ' % complete');
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

generator(writeUsers, 'utf-8', () => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log("************* CSV WRITE COMPLETE *************");
  writeUsers.end();
});
