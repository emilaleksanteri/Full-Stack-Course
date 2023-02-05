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

console.log(caluclateBmi(115, 1.95));
