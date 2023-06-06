import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
   <div>

    <h1>Home Page</h1>

{/* for navigation */}
    <li>
      <Link href='/about'>About Us</Link>
    </li>

   </div>
  )
}
