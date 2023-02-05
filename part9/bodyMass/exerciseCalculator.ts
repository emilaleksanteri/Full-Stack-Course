interface exerciseObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExercise: Array<number>,
  target: number
): exerciseObject => {
  const periodLength = dailyExercise.length;
  const totalE = dailyExercise.reduce((add, total) => add + total, 0);
  const averageHrs = totalE / periodLength;
  const trainingDays = dailyExercise.filter((num) => num !== 0).length;
  const reached = averageHrs >= target;

  const rating = (averageHrs: number, target: number): number => {
    if (averageHrs > target) return 3;
    if (averageHrs === target) return 2;
    if (averageHrs < target) return 1;
  };

  const description = (rating: number): string => {
    if (rating === 3) return 'perfect, well done!';
    if (rating === 2) return 'good job, goal reached!';
    if (rating === 1) return 'not too bad but could be better';
  };

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: reached,
    rating: rating(averageHrs, target),
    ratingDescription: description(rating(averageHrs, target)),
    target: target,
    average: averageHrs,
  };
};

interface exerciseValues {
  exerciseArray: Array<number>;
}
