import React, { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <Header text="Anecdote of the day" />
      <p>{anecdote}</p>
      <div>
        has {votes} votes.
      </div>
    </>
  )
}

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  let highestVote = Math.max(...votes);
  let index = votes.indexOf(highestVote);

  if (highestVote === 0)
    return <p>No anecdote is voted yet.</p>

  return (
    <>
      <Header text="Most voted anecdote" />
      <p>{anecdotes[index]}</p>
    </>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))

  const setVotesFunc = () => {
    let votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  }

  const setAnecdoteFunc = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  return (
    <>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={setVotesFunc} text='Vote' />
      <Button onClick={setAnecdoteFunc} text='Next anecdote' />
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  )
}

export default App;
