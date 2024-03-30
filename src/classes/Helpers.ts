import * as readline from 'readline'

export const print = (
    text: string = "",
    delay: number = 45
) => {
    // let index = 0
    // const intervalId = setInterval(() => {
    //     process.stdout.write(text[index])
    //     index++
    //     if (index == text.length) {
    //         clearInterval(intervalId)
    //         process.stdout.write('\n')
    //     }
    // }, delay)
    console.log(text)
}

export const getInput = (
    question: string
): Promise<string> => {

    let toReturn: string = ''

    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise<string>((resolve, reject) => {
        reader.question(question, (input: string) => {
            resolve(input)
        })
    })
}
