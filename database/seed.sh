cqlsh -f ./database/schema.cql
node ./database/dataGenerator.js
cqlsh COPY  FROM 'carousel.imageData' WITH DELIMITER='|' AND HEADER=TRUE;