cqlsh -f ./database/Cassandra/schema.cql
node ./database/Cassandra/dataGenerator.js
cqlsh COPY carousel.imageData FROM './database/data.csv' WITH DELIMITER='|' AND HEADER=TRUE;