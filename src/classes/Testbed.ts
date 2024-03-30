import * as XLSX from 'xlsx'
import { getInput } from './Helpers'

const excelReader = () => {
    const book = XLSX.readFile('test.xls')
    const name = book.SheetNames[0]
    const sheet = book.Sheets[name]
    const data = XLSX.utils.sheet_to_json(sheet)

    console.log(data)
}

const inputTest = async () => {
    const userInput = await getInput("what is your name? ");
    console.log("you enetered ==> ", userInput)
}

// excelReader()
// inputTest()