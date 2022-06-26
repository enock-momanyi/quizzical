import React from "react";
import { Api, QR } from "./api.nterface";
import Question from "./Question";
import { nanoid } from "nanoid";
export default function Quiz(){


    const [dispalyScore, setDisplayScore] = React.useState(false)
    const [start, setStart] = React.useState(false)
    const [questionsArray, setQuestionsArray] = React.useState([] as QR[])


    React.useEffect(()=>{
        //json response
        //object with response_code and results array of objects
        //each object has category,correct_answer, difficulty, incorrect_answers(array), question, type

        fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple')
        .then(res => res.json())
        .then(data => {preprocess(data)}).catch(()=>{})

    },[start])

    function preprocess(questionsArray:Api){
        //reset to initial states
        setDisplayScore(false)
        setQuestionsArray([] as QR[])
        const results = questionsArray.results
        for(let i = 0; i < 5; i++){
            //combine the correct answer and incorrect answers then reshuffle
            const choices = [results[i].correct_answer].concat(results[i].incorrect_answers)
            shuffleArray(choices)
            //insert question into questionsArray state
            setQuestionsArray(prevQuestions => {
                return [...prevQuestions, {
                    id:nanoid(),
                    correct_answer:results[i].correct_answer,
                    choices: choices,
                    question: results[i].question,
                    answer: ''
                }]
            })
                    
        }
    }
    //shuffles an array
    function shuffleArray(array: any[]){
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[j]
            array[j] = array[i]
            array[i] = temp
        }
    }
    // update answer in questionsArray state based on the id
    function updateAnswer(idx: string, ans: string){
        setQuestionsArray(prevQuizArray => prevQuizArray.map(question => {
            return question.id === idx ? {...question, answer:ans} : question
        }))
    }

    function calculateScore(){
        let score = 0
        questionsArray.forEach(elem => {
            score += Number(elem.correct_answer === elem.answer)
            console.log(elem.correct_answer," ", elem.answer)
        })
        return score
    }
    function playAgain(){
        setStart(prev => !prev)
    }
    //create jsx question eleements
    const quizElements = questionsArray.map( question => {

        return <Question 
                    key={question.id} 
                    quest={question.question} 
                    choices = {question.choices}
                    updateAnswer = {updateAnswer}
                    id = {question.id}
                    dispalyScore = {dispalyScore}
                    correct_answer = {question.correct_answer}
                    />
    })

    return (
        <div className="flex-container-2">
            <div className="flex-item-block">
            {quizElements}
            </div>
            {dispalyScore && <div> You scored { calculateScore() }/5 correct answers. </div> }
            <br />
            <button onClick={dispalyScore? playAgain : (event) => {setDisplayScore(true)}} className="check-button"> {dispalyScore? "Play again": "Check answers"}</button>
        </div>
    )
}