DROP KEYSPACE IF EXISTS carousel;

CREATE KEYSPACE carousel WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

USE carousel;

CREATE TABLE imageData (
    id int PRIMARY KEY,
    game_title text,
    new_price float,
    preowned_price float,
    digital_price float,
    main_image text,
    images list<text>
);