import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!isNaN(Number(weight)) && !isNaN(Number(height))) {
    const bmi = calculateBmi(height, weight);
    res.json({ weight: weight, height: height, bmi: bmi });
  } else {
    res.status(500).send({ error: "malformatted parameters" });
  }
});

app.post("/exercise", (req, res) => {
  const exercises = req.body.daily_exercises;
  const target = req.body.target;
  const exercisesArray: Array<number> = exercises.map((i: string) =>
    parseInt(i)
  );

  if (!Array.isArray(exercises) || !target) {
    res.send({ error: "parameters missing" });
  } else if (isNaN(Number(target))) {
    res.send({ error: "malformatted parameters" });
  } else {
    let result = exerciseCalculator(exercisesArray, target)
    res.json(result)
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
