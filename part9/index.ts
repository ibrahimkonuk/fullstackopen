import express from "express";
const app = express();
const path = require("path");
import calculateBmi from "./bmiCalculator";

app.use(express.static("public"));

app.get("", (_request: express.Request, response: express.Response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.get("/bmi", (request: express.Request, response: express.Response) => {
  if (request.query.weight && request.query.height) {
    const weight = Number(request.query.weight.toString().trim());
    const height = Number(request.query.height.toString().trim());

    if (!isNaN(weight) && !isNaN(height)) {
      const bmi = calculateBmi({
        height,
        weight,
      });

      response.json({
        height,
        weight,
        bmi,
      });
    } else {
      response.status(400).json({ error: "both values must be number" });
    }
  } else {
    response.status(400).json({ error: "malformatted parameters" });
  }
});

app.get("/hello", (_request: express.Request, response: express.Response) => {
  response.send("Hello Full Stack!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
