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
    let validateNumbers = args.slice(2).map((i) => parseInt(i)).includes(NaN)
    let target = Number(args.slice(2).shift())
    let hours = args.slice(3).map(i => parseInt(i))
    console.log(hours)

  if (!validateNumbers) {
    return {
        hours: hours,
        target: target
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const exerciseCalculator = (hours: Array<number>, target: number): Result => {
    let periodLength: number = hours.length
    let trainingDays: number = 0

    for (const elem of hours) { if (elem > 0) trainingDays++ }
    let averageTime: number = hours.reduce((a: number, b: number) => a + b, 0) / periodLength;
    let success: boolean = averageTime < target ? false : true;
    let finalAverage: number = target - averageTime;
    let rating: number = averageTime > target ? 3 : finalAverage < 1 ? 2 : 1;
    let ratingDescription: string = rating == 3 ? "good job!" : rating == 2 ? "not too bad but could be better" : "work hard"

   return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTime
}

}

try {
    const {hours, target } = valuesParse(process.argv)
    console.log(exerciseCalculator(hours, target))

} catch (e) {
    console.log(e.message)
}

