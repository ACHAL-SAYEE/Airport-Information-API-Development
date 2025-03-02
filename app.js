const express = require("express");
const app = express();
const { AppDataSource } = require("./data-source.js");
// const { Airport } = require("./models/airport.js");
AppDataSource.initialize();

app.listen(3007, () => {
  console.log("Server running on http://localhost:3007");
});

// /api/airport/:iata_code
app.get("/api/airport/:iata_code", async (req, res) => {
  const { iata_code } = req.params;
  let result = await AppDataSource.query(
    `SELECT 
      airport.*,
      city.id AS city_id, city.name AS city_name, city.country_id, city.is_active, city.lat AS city_lat, city.long AS city_long,
      country.id AS country_id, country.name AS country_name, country.country_code_three, 
      country.mobile_code, country.continent_id
      FROM airport
      JOIN city ON airport.city_id = city.id
      JOIN country ON city.country_id = country.id
      WHERE airport.iata_code = ?`,
    [iata_code]
  );
  result = result[0];
  const {
    wikipedia_link,
    city_id,
    city_name,
    country_id,
    is_active,
    city_lat,
    city_long,
    country_name,
    country_code_three,
    country_code_two,
    mobile_code,
    continent_id,
    ...rest
  } = result;

  console.log(result);
  res.send({
    ...rest,
    address: {
      city: {
        id: city_id,
        name: city_name,
        country_id,
        is_active,
        lat: city_lat,
        long: city_long,
      },
      country: {
        id: country_id,
        name: country_name,
        country_code_two,
        country_code_three,
        mobile_code,
        continent_id,
      },
    },
  });
});
