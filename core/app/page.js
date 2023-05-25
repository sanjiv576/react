
'use client'

import Feedback from '@/components/Feedback'
import Counter from '../components/Counter';
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  // common  state for 2 buttons
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(count + 1);

  return (
    <div>
      <p>Counter :  {count} </p>

      {/* here passing handleClick state to the children of Home i.e Counter */}
      {/* NOTE: passing value from child to parent or vice-versa 
      but not child to child like Counter to Counter is not possbile
      so, we pass value from parent to child and child to parent */}
      <Counter clickHandle={handleClick} />
      <Counter clickHandle={handleClick} />
      

      <Feedback />
    </div>
  )
}
