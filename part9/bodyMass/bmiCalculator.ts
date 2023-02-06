const caluclateBmi = (weight: number, height: number): string => {
  const BMI = weight / Math.pow(height, 2);

  if (BMI >= 18.5 && BMI <= 24.9) {
    return 'Normal (healthy weight)';
  }

  if (BMI >= 25) {
    if (BMI > 29.9 && BMI < 35) return 'Obese Class I (unhealthy weight)';
    if (BMI > 34.9 && BMI < 40) return 'Obese Class II (unhealthy weight)';
    if (BMI >= 40) return 'Obese Class III (unhealthy weight)';
    return 'Overweight (unhealthy weight)';
  }

  if (BMI <= 18.4) {
    if (BMI < 17 && BMI >= 16)
      return 'Underweight Moderate Thinness (unhealthy weight)';
    if (BMI < 16) return 'Underweight Severe Thinness (unhealthy weight)';
    return 'Underweight Mild Thinness (unhealthy weight)';
  }
};

interface bmiValues {
  weight: number;
  height: number;
}

const parseArgsBmi = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');
  const w = Number(args[2]);
  const h = Number(args[3]);

  if (isNaN(w) || isNaN(h)) throw new Error('arguments were not numbers');

  return {
    weight: w,
    height: h,
  };
};

try {
  const { weight, height } = parseArgsBmi(process.argv);
  console.log(caluclateBmi(weight, height));
} catch (error: unknown) {
  let errorMsg = 'Something bad happened..';
  if (error instanceof Error) {
    errorMsg += 'Error: ' + error.message;
  }
  console.log(errorMsg);
}
