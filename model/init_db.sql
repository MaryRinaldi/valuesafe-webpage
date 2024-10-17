-- Rename to match if necessary, currently assuming it is `init_db.sql`

-- Drop Tables
DROP TABLE IF EXISTS PCP_FMD;
DROP TABLE IF EXISTS Animal_Diseases;
DROP TABLE IF EXISTS feedback;

-- Set foreign key checks
SET foreign_key_checks = 0;

-- create pcp fmd table
CREATE TABLE PCP_FMD (
    id INT PRIMARY KEY,
    country VARCHAR(100),
    area VARCHAR(100),
    roadmap_region VARCHAR(100),
    year INT,
    pcp_fmd_stage VARCHAR(50),
    last_meeting_attended VARCHAR(100),
    pso_support VARCHAR(100)
);

-- create animal disease table
CREATE TABLE Animal_Diseases (
    year INT,
    semester VARCHAR(50),
    world_region VARCHAR(100),
    country VARCHAR(100),
    administrative_division VARCHAR(100),
    disease VARCHAR(100),
    serotype_subtype_genotype VARCHAR(100),
    animal_category VARCHAR(100),
    species VARCHAR(100),
    event_id INT,
    outbreak_id INT,
    new_outbreaks INT,
    susceptible INT,
    measuring_units VARCHAR(50),
    cases INT,
    killed_disposed INT,
    slaughtered INT,
    deaths INT,
    vaccinated INT
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
INSERT INTO PCP_FMD (id, country, area, roadmap_region, year, pcp_fmd_stage, last_meeting_attended, pso_support) VALUES
(1178, 'Afghanistan', NULL, 'West Eurasia', 2024, 'PCP-1', 'April 2023', NULL),
(1183, 'Bahrain', NULL, 'Middle East', 2024, 'PCP-2', 'December 2021', NULL),
(1190, 'Cambodia', NULL, 'SEACFMD', 2024, 'PCP-1', NULL, NULL),
(1202, 'Egypt', NULL, 'Middle East', 2024, 'PCP-2', 'December 2021', NULL),
(1203, 'Equatorial Guinea', NULL, 'Central Africa', 2024, 'PCP-0', 'September 2022', NULL),
(1204, 'Eritrea', NULL, 'East Africa', 2024, 'PCP-1', 'March 2022', NULL),
(1205, 'Eswatini', NULL, 'Southern African Development Community', 2024, NULL, 'November 2020', NULL);

-- Insert data into animal disease table
INSERT INTO Animal_Diseases (year, semester, world_region, country, administrative_division, disease, serotype_subtype_genotype, animal_category, species, event_id, outbreak_id, new_outbreaks, susceptible, measuring_units, cases, killed_disposed, slaughtered, deaths, vaccinated) VALUES
(2024, 'Jan-Jun 2024', 'Africa', 'Libya', 'Misratah', 'Lumpy skin disease virus (Inf. with)', '-', 'Domestic', 'Cattle', 5091, 0, 2, 11, 'Animal', 9, 0, 0, 4, 0),
(2024, 'Jan-Jun 2024', 'Asia', 'Hong Kong', 'North', 'African swine fever virus (Inf. with)', '-', 'Domestic', 'Swine', 5323, 129771, 1, 489, 'Animal', 2, 489, 0, 0, 0),
(2024, 'Jan-Jun 2024', 'Asia', 'Hong Kong', 'Yuen Long', 'African swine fever virus (Inf. with)', '-', 'Domestic', 'Swine', 5323, 0, 3, 3581, 'Animal', 12, 3581, 0, 0, 0),
(2024, 'Jan-Jun 2024', 'Asia', 'Korea (Rep. of)', 'Paju', 'African swine fever virus (Inf. with)', '-', 'Domestic', 'Swine', 4345, 130406, 1, 2394, 'Animal', 35, 2375, 0, 19, 0),
(2024, 'Jan-Jun 2024', 'Asia', 'Korea (Rep. of)', 'Yeongdeok', 'African swine fever virus (Inf. with)', '-', 'Domestic', 'Swine', 4345, 130405, 1, 519, 'Animal', 27, 499, 0, 20, 0),
(2024, 'Jan-Jun 2024', 'Asia', 'Nepal', 'Bhimad', 'African swine fever virus (Inf. with)', '-', 'Domestic', 'Swine', 4458, 131375, 1, 5, 'Animal', 2, 0, 0, 2, 0),
(2024, 'Jan-Jun 2024', 'Asia', 'Nepal', 'MadhyaNepal', 'African swine fever virus (Inf. with)', '-', 'Domestic', 'Swine', 4458, 131376, 1, 17, 'Animal', 8, 0, 0, 4, 0);

-- Set foreign key checks
SET foreign_key_checks = 1;
