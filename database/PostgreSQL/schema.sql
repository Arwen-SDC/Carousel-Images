DROP DATABASE IF EXISTS carousel;
CREATE DATABASE carousel;

CREATE TABLE imageData(
   id int PRIMARY KEY,
   digitial_price float,
   game_title varchar(100),
   images text[],
   main_image text,
   new_price float,
   preowned_price float
);
