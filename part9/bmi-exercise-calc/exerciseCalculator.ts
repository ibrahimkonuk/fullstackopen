interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

type Rating = 1 | 2 | 3;
const scale = 3;

const calculateExercise = (data: Array<number>, target: number): Result => {
  const periodLength: number = data.length;
  const trainingDays: number = data.filter((day) => day !== 0).length;
  const average: number =
    data.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success: boolean = average === target ? true : false;
  let rating: Rating = 1;
  let ratingDescription = "";

  if (average <= target / scale) {
    rating = 1;
    ratingDescription = "Not bad, keep on keeping on!";
  } else if (average > target / scale && average < target) {
    rating = 2;
    ratingDescription = "Good, you're almost there!";
  } else if (average >= target) {
    rating = 3;
    ratingDescription = "Excellent, the sky’s the limit!";
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

export default calculateExercise;
