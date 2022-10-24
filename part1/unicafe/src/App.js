import { useState } from 'react'

// button component
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

// Statistics overall # of each review
// Statistics scores average and % positive reviews
// calculating average score good == 1 point, bad == -1 point and neutral == 0 points 
// total == total number of reviews
// % positive = good / total # of reviews * 100
const Statistics = (props) => {

  var score = props.good - props.bad
  var total = props.good + props.bad + props.neutral

  var average = score / total

  var per_positive = (props.good / total) * 100

  if (total === 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tr>
            <td><Statisticline text='good' /></td>
            <td><Statisticline value={props.good} /></td>
          </tr>
          <tr>
            <td><Statisticline text='neutral' /></td>
            <td><Statisticline value={props.neutral} /></td>
          </tr>
          <tr>
            <td><Statisticline text='bad' /></td>
            <td><Statisticline value={props.bad} /></td>
          </tr>
          <tr>
            <td><Statisticline text='all' /></td>
            <td><Statisticline value={total} /></td>
          </tr>
          <tr>
            <td><Statisticline text='average' /></td>
            <td><Statisticline value={average} /></td>
          </tr>
          <tr>
            <td><Statisticline text='positive' /></td>
            <td><Statisticline value={per_positive} /></td>
          </tr>
        </table>
      </div>
    )
  }
}

// statistics refactored
const Statisticline = (props) => {
  return <p>{props.text} {props.value}</p>
}

// main
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodReview = () => {
    setGood(good + 1)
  }

  const neutralReview = () => {
    setNeutral(neutral + 1)
  }

  const badReview = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodReview} text='good' />
      <Button handleClick={neutralReview} text='neutral' />
      <Button handleClick={badReview} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App