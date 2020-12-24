interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const valuesParse = (args: Array<string>) => {
    const validateNumbers: boolean = args.slice(2).map((i) => parseInt(i)).includes(NaN);
    const target = Number(args.slice(2).shift());
    const hours: Array<number> = args.slice(3).map(i => parseInt(i));

  if (!validateNumbers) {
    return {
        hours: hours,
        target: target
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const exerciseCalculator = (hours: Array<number>, target: number): Result => {
    const periodLength = hours.length;
    let trainingDays = 0;

    for (const elem of hours) {if (elem > 0) trainingDays++;}
    const averageTime: number = hours.reduce((a: number, b: number) => a + b, 0) / periodLength;
    const success: boolean = averageTime < target ? false : true;
    const finalAverage: number = target - averageTime;
    const rating: number = averageTime > target ? 3 : finalAverage < 1 ? 2 : 1;
    const ratingDescription: string = rating == 3 ? "good job!" : rating == 2 ? "not too bad but could be better" : "work hard";

   return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTime
};

};

try {
    const {hours, target } = valuesParse(process.argv);
    console.log(exerciseCalculator(hours, target));

} catch (e) {
    console.log(e);
}

