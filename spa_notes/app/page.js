import Notes from '@/components/Notes'
import Image from 'next/image'

export default function Home() {
  {/* data structure */ }
  const notes = [
    {
      id: 1,
      desc: 'today is chill',
      important: true
    },
    {
      id: 2,
      desc: 'today is fun',
      important: false
    },
    {
      id: 3,
      desc: 'today is Thursday',
      important: true
    }
  ]
  return (
    <div>

      <Notes notes={notes} />

      
    </div>
  )
}
