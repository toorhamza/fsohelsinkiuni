type result = "healthy weight" | "over weight" | "under weight";

interface values {
  height: number,
  weight: number
}

const parseValues = (args: Array<string>): values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): result => {
  const BMI = weight / (((height / 100) * height) / 100);

  if (BMI < 18.5) {
    return "under weight";
  }
  if (BMI > 18.5 && BMI < 25) {
    return "healthy weight";
  }
  else {
    return "over weight";
  }
};

try {
  const { height, weight } = parseValues(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log(e);
}