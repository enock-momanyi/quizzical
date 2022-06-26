import React from 'react'
import Welcome from './Welcome'
import Quiz from './Quiz'
export default function App(){
  const [quiz, setQuiz] = React.useState(false)
  const v = 1;
  function startQuiz(){
    setQuiz(true)
  }

  return (
    <div className="">
      {quiz ? <Quiz /> : <Welcome start={startQuiz} />}
      </div>
  )
}