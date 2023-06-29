import React, { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0);
    const [amount, setAmount] = useState('');
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count+1)}>Increase Count</button>

      <input type='number' value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}/>
      <button onClick={() => setCount(amount)}>Set</button>
    </div>
  )
}
