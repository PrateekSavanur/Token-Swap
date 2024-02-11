const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/tokenPrice", async (req, res) => {
  const { query } = req;

  const response1 = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressOne,
    chain: 11155111,
  });

  const response2 = await Moralis.EvmApi.token.getTokenPrice({
    address: query.addressTwo,
    chain: 11155111,
  });

  const usdPrices = {
    tokenOne: response1.raw.usdPrice,
    tokenTwo: response2.raw.usdPrice,
    ratio: response1.raw.usdPrice / response2.raw.usdPrice,
  };

  return res.status(200).json(usdPrices);
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
