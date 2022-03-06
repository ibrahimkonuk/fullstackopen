import express from "express";
import path = require("path");
const app = express();
import bodyParser = require("body-parser");
import calculateBmi from "./bmiCalculator";
import calculateExercise from "./exerciseCalculator";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

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

app.post(
  "/exercise",
  (request: express.Request, response: express.Response) => {
    if (request.body.hours && request.body.target) {
      const data = String(request.body.hours).split(",").map(Number);
      const target = Number(request.body.target);

      if (isNaN(target) || !Array.isArray(data) || data.includes(NaN)) {
        response.status(400).json({ error: "malformatted parameters" }).end();
      } else {
        const result = calculateExercise(data, target);
        response.json(result).end();
      }
    } else {
      response.status(400).json({ error: "parameters missing" }).end();
    }
  }
);

app.get("/hello", (_request: express.Request, response: express.Response) => {
  response.send("Hello Full Stack!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
