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
  targethrs: number;
}

const parseArgsExer = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enogh arguments!!'); // can have 1 exercise day and one target, min is 4 args
  let exercises: Array<number> = [];
  const target = Number(args[args.length - 1]);

  if (isNaN(target)) throw new Error('Provided values were not numbers');

  for (let i = 2; i < args.length - 1; i++) {
    let hour = Number(args[i]);
    if (isNaN(hour)) throw new Error('Provided values were not numbers!');
    exercises.push(hour);
  }

  return {
    exerciseArray: exercises,
    targethrs: target,
  };
};

try {
  const { exerciseArray, targethrs } = parseArgsExer(process.argv);
  console.log(calculateExercises(exerciseArray, targethrs));
} catch (error: unknown) {
  let errorMsg = 'Something bad happened..';
  if (error instanceof Error) {
    errorMsg += 'Error: ' + error.message;
  }
  console.log(errorMsg);
}
