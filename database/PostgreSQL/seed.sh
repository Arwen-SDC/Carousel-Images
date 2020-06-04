sudo -u postgres -i
psql "dbname=carousel options=--search_path=myschema" -a -f ./database/PostgreSQL/schema.sql