type Units = {
  height: number;
  weight: number;
};

const calculateBmi = (units: Units): string => {
  const { height, weight } = units;

  const bmi: number = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) return "Underweight";
  else if (bmi >= 18.5 && bmi <= 25) return "Normal";
  else if (bmi >= 25 && bmi <= 30) return "Obese";
  else return "Overweight";
};

const units: Units = {
  height: Number(process.argv[2]),
  weight: Number(process.argv[3]),
};

try {
  calculateBmi(units);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error);
  }
}

export default calculateBmi;
