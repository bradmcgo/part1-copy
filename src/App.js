import React, { useState } from 'react'
//Very ugly code inbound. I take zero pride in this. I'm committing it... Yikes...

const Header = (props) => {
  console.log(props.header)
  return (
    <h1>
      {props.header}
    </h1>
  )
}

const StatisticLine = (props) => {
  console.log(props)
  return (
    <div>
      <table >
        <tbody>
          <tr>
            <td>{props.feedback}</td> <td>{props.score}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Content = (props) => {
  console.log(props.scorestate.selected)
  if (props.scorestate.total === 0) {
    return (
      <div>
        <StatisticLine />
      </div>
    )
  }
  return (
    <div>
      <StatisticLine feedback={"good"} score={props.scorestate.good} />
      <StatisticLine feedback={"neutral"} score={props.scorestate.neutral} />
      <StatisticLine feedback={"bad"} score={props.scorestate.bad} />
    </div>
  )
}

const Anecdote = (props) => {
  console.log(props.scorestate)
  console.log(props.votes)
  
  console.log(props.selectedNum)

  if (props.selectedNum === 0) {
    return (
      <div>
        <StatisticLine score={props.scorestate} />
        has {props.votes[0]} votes
      </div>
    )
  } if (props.selectedNum === 1) {
    return (
      <div>
        <StatisticLine score={props.scorestate} />
        has {props.votes[1]} votes
      </div>
    )
  } if (props.selectedNum === 2) {
    return (
      <div>
        <StatisticLine score={props.scorestate} />
        has {props.votes[2]} votes
      </div>
    )
  } if (props.selectedNum === 3) {
    return (
      <div>
        <StatisticLine score={props.scorestate} />
        has {props.votes[3]} votes
      </div>
    )
  } if (props.selectedNum === 4) {
    return (
      <div>
        <StatisticLine score={props.scorestate} />
        has {props.votes[4]} votes
      </div>
    )
  } if (props.selectedNum === 5) {
    return (
      <div>
        <StatisticLine score={props.scorestate} />
        has {props.votes[5]} votes
      </div>
    )
  } if (props.selectedNum === 6) {
    return (
      <div>
        <StatisticLine score={props.scorestate} />
        has {props.votes[6]} votes
      </div>
    )
  }
}

const TopAnecdote = (props) => {
  const topAnecdoteIndex = props.votes.indexOf(Math.max(...props.votes))
  return(<div>
  <StatisticLine score={props.top[topAnecdoteIndex]} />
  has {props.votes[topAnecdoteIndex]} votes
  </div>
  )
}

const Statistics = (props) => {
  console.log(props.stats.all)
  if (props.stats.all === 0) {
    return (
      <div>
        <StatisticLine feedback={"No feedback given"} />
      </div>
    )
  }
  return (
    <div>
      <StatisticLine feedback={"all"} score={props.stats.all} />
      <StatisticLine feedback={"average"} score={props.stats.average} />
      <StatisticLine feedback={"positive"} score={props.stats.positive} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = (props) => {
  console.log(props)
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, total: 0
  })
  const [stats, setStats] = useState({
    all: 0, average: 0, positive: 0
  })
  // create state of selected anecdote
  const [selected, setSelected] = useState(0)
  const [selectedNum, setSelNum] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])

  console.log(selected)
  console.log(selectedNum)
  console.log(votes)

  //create array of anecdotes
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  //create constant to call random object from array. Store object in state object.
  const randomAnecdote = () => {
    const randomNumGen = Math.floor(Math.random() * anecdotes.length)
    console.log(randomNumGen)
    const getAnecdote = anecdotes[randomNumGen]
    console.log(getAnecdote)
    setSelected(getAnecdote)
    setSelNum(randomNumGen)
  }

  const voteHandler = () => {
    const points = [0, 0, 0, 0, 0, 0, 0]

    const copy = [...points]
    // increment the value in position n by one
    copy[selectedNum] += 1
    console.log(copy)
    setVotes(copy)

    const updatevotes = [...votes]
    // increment the value in position n by one
    updatevotes[selectedNum] += 1
    setVotes(updatevotes)

    console.log(points)
    console.log(votes)
  }

  const handleStats = () => {
    const stats = {
      all: (clicks.good + clicks.neutral + clicks.bad) + 1,
      average: clicks.good + clicks.neutral + clicks.bad / 3,
      positive: clicks.good / (clicks.neutral + clicks.bad) * 100
    }
    setStats(stats)
  }

  const handleGood = () => {
    const newClicks = {
      good: clicks.good + 1, neutral: clicks.neutral, bad: clicks.bad,
      total: (clicks.good + 1) + clicks.neutral + clicks.bad
    }
    setClicks(newClicks)
    handleStats()
  }

  const handleNeutral = () => {
    const newClicks = {
      good: clicks.good, neutral: clicks.neutral + 1, bad: clicks.bad
    }
    setClicks(newClicks)
    handleStats()
  }

  const handleBad = () => {
    const newClicks = {
      good: clicks.good, neutral: clicks.neutral, bad: clicks.bad + 1, all: clicks.good + clicks.neutral + clicks.bad, average: clicks.good + clicks.neutral + clicks.bad / 3, positive: clicks.positive
    }
    setClicks(newClicks)
    handleStats()
  }

  //Also need both state and score props to pass to Component function.

  return (
    <div>
      <Header header={"give feedback"} />
      <Button handleClick={handleGood} text={"good"} /><Button handleClick={handleNeutral} text={"neutral"} /><Button handleClick={handleBad} text={"bad"} />
      <Header header={"statistics"} />
      <Content scorestate={clicks} />
      <Statistics stats={stats} />
      {/* pass random anecdote as prop to Content */}
      <Anecdote scorestate={selected} votes={votes} selectedNum={selectedNum} />
      {/* execute randomElement function upon button click */}
      <Button handleClick={voteHandler} text="vote" /><Button handleClick={randomAnecdote} text="next anecdote" />
      <Header header={"Anecdote with the most votes"} />
      <TopAnecdote top={anecdotes} votes={votes} />
    </div>
  )
}

export default App