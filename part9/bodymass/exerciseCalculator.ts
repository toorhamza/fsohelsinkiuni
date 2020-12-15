interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))