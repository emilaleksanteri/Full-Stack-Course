import React from 'react'
import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.function}>{props.text}</button>
  )
}

const Votes = (props) => {
  return (
    <p>has {props.votes} votes</p>
  )
}

const Favourite = (props) => {
  const top = Math.max(...props.votes)
  const idx = props.votes.indexOf(top)

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[idx]}</p>
      <p>has {props.votes[idx]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  // makes useState a random number in range of length of the array anecdotes
  // while loop used to make sure that the next random number is not same as one used before
  const random = () => {

    var integer = Math.floor(Math.random() * anecdotes.length)

    while(integer === selected){
      integer = Math.floor(Math.random() * anecdotes.length)
    }
    if (integer !== selected){
      setSelected(integer)
    }
  }

  const voting = () =>{
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Votes votes={[votes[selected]]} />
      <Button function={random} text='next anecdote' />
      <Button function={voting} text='vote' />
      <Favourite votes={votes} anecdotes={anecdotes} />
      </div>
      )
}

export default App