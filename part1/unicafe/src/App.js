import { useState } from 'react'

const Header = ({ text }) => <div><h1>{text}</h1></div>

const Display = ({ text, number }) => <div>{text} {number}</div>


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header text={"Give feedback"} />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Header text={"Statistics"} />
      <Display text={"good"} number={good} />
      <Display text={"neutral"} number={neutral} />
      <Display text={"bad"} number={bad} />
    </div>
  )

}
export default App