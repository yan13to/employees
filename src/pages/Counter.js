import React from 'react'

export default function Counter() {
  const [counter, setCounter] = React.useState(0)

  const addCounter = (e) => {
    e.preventDefault()

    setCounter(counter + 1)
  }

  const resetCounter = (e) => {
    e.preventDefault()

    setCounter(0)
  }

  return (
    <div className="text-center">
      <h1 style={{fontSize: '5rem'}}>{counter}</h1>
      <button className="btn btn-primary mx-2" type="button" onClick={addCounter}>+</button>
      <button className="btn btn-secondary" type="button" onClick={resetCounter}>Reset</button>
    </div>
  )
}