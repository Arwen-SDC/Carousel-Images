DROP KEYSPACE IF EXISTS carousel;

CREATE KEYSPACE carousel WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

USE carousel;

CREATE TABLE imageData (
    id UUID PRIMARY KEY,
    gameTitle text,
    newPrice Decimal,
    preOwnedPrice Decimal,
    digitalPrice Decimal,
    mainImage text,
    images list<text>
);