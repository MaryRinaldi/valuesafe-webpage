-- Rename to match if necessary, currently assuming it is `init_db.sql`

-- Drop Tables
DROP TABLE IF EXISTS geo_data;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS feedback;

-- Set foreign key checks
SET foreign_key_checks = 0;

-- create Gis table table
CREATE TABLE geo_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  geojson_data JSON NOT NULL
);

-- create animal disease table
CREATE TABLE users (
    year INT

);

-- create feedback table
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    countryRepresented TEXT,
    regionRepresented TEXT,
    useForTool VARCHAR(255) NOT NULL,
    usabilityMap INT NOT NULL,
    usabilityPredictionTool INT NOT NULL,
    additionalComments TEXT,
    overallExperience INT NOT NULL,
    featureRequests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert data in pcp_fmd table
INSERT INTO geo_data (id) VALUES
(1178)

-- Insert data into animal disease table
INSERT INTO users (year) VALUES
(2024)
-- Set foreign key checks
SET foreign_key_checks = 1;
