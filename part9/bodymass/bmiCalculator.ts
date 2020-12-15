type result = "healthy weight" | "over weight" | "under weight";

const calculateBmi = (height: number, weight: number): result => {
  if (height <= 0) throw new Error("Height should be a number");
  if (weight <= 0) throw new Error("Weight should be a number");

  var BMI = weight / (((height / 100) * height) / 100);

  if (BMI < 18.5) {
    return "under weight";
  }
  if (BMI > 18.5 && BMI < 25) {
    return "healthy weight";
  }
  if (BMI > 25) {
    return "over weight";
  }
};
try {
    console.log(calculateBmi(180, 74))

} catch(e) {
    console.log(e.message)
}
