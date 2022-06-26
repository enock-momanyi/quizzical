
export interface Api{
    response_code:number,
    results: Question[]
}

interface Question{
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export interface QR{
    correct_answer: string,
    choices: string[],
    question: string,
    answer:string,
    id: string,
}