var express = require("express");
var router = express.Router();


const db = require("../model/helper");
require("dotenv").config();

// variables needed for bcrypt to do the encryption
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Express" });
});


router.post('/feedback', async (req, res) => {
  const { countryRepresented, regionRepresented, useForTool, usabilityMap, usabilityPredictionTool, additionalComments, overallExperience, featureRequests } = req.body;
  
  try {
    const sql = `
      INSERT INTO feedback (usabilityMap, usabilityPredictionTool, additionalComments, overallExperience, featureRequests)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db(sql, [countryRepresented, regionRepresented, useForTool, usabilityMap, usabilityPredictionTool, additionalComments, overallExperience, featureRequests]);
    res.status(200).send('Feedback submitted successfully');
  } catch (error) {
    console.error('Failed to insert feedback:', error);
    res.status(500).send('Failed to submit feedback');
  }
});


// Route for reversed geocoding
router.get("/reverse-geocoding", async (req, res) => {
  try {
    const { longitude, latitude } = req.query;
    const reverseGeocodeResponse = await geocodingClient
      .reverseGeocode({
        query: [longitude, latitude],
        limit: 1,
      })
      .send();

    const results = reverseGeocodeResponse.body.features;
    if (results.length > 0) {
      const address = results[0].place_name;
      res.json({ address });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    console.error("Error during reversed geocoding:", error);
    res.status(500).json({ message: "Error during reversed geocoding" });
  }
});

router.get("/pcp_fmd", async (req, res) => {
  try {
    const response = await db(`SELECT * FROM PCP_FMD`);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post("/animal_diseases", async (req, res) => {
  const newData = req.body; // Assuming the request body contains the data for the new record
  try {
    await db(`INSERT INTO Animal_Diseases SET ?`, newData);
    res.send({ message: "New record added successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get("/pcp_fmd/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db(`SELECT * FROM PCP_FMD WHERE id = ${id}`);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.put("/animal_diseases/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body; // Assuming the request body contains the updated data
  try {
    await db(`UPDATE Animal_Diseases SET ? WHERE event_id = ${id}`, newData);
    res.send({ message: "Record updated successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});


router.delete("/pcp_fmd/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db(`DELETE FROM PCP_FMD WHERE id = ${id}`);
    res.send({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get("/animal_diseases/search", async (req, res) => {
  const { country, disease } = req.query; // Assuming query parameters for filtering
  try {
    const response = await db(`SELECT * FROM Animal_Diseases WHERE country = "${country}" AND disease = "${disease}"`);
    res.send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
