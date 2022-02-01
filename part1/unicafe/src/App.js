import React, { useState } from "react";

function Button({ text, stateAction }) {
  return (
    <button onClick={stateAction}>{text}</button>
  )
}

function StatisticLine({ text, value }) {
  if (text.toLowerCase().trim() === "positive")
    return <p>{text}: {value} %</p>

  return (
    <p>{text}: {value}</p>
  )
}

function Statistics({ good, neutral, bad }) {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given.</p>
  }

  return (
    <>
      <h2>Statistics</h2>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={good + neutral + bad} />
      <StatisticLine text="Average" value={(good - bad) / (good + neutral + bad)} />
      <StatisticLine text="Positive" value={(good * 100) / (good + neutral + bad)} />
    </>
  )
}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodFunc = () => setGood(good + 1)
  const setNeutralFunc = () => setNeutral(neutral + 1)
  const setBadFunc = () => setBad(bad + 1)

  return (
    <div className="App">
      <h1>Give Feedback</h1>
      <Button text='Good' stateAction={setGoodFunc} />
      <Button text='Neutral' stateAction={setNeutralFunc} />
      <Button text='Bad' stateAction={setBadFunc} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
