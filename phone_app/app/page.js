import PhoneBook from '@/components/PhoneBook';
import Image from 'next/image'

export default function Home() {

  // data
  const contacts = [
    {
      id: 1,
      name: "Achyut Timsina",
      phone: "9841414243"
    },
    {
      id: 2,
      name: "Kiran Rana",
      phone: "9841103035"
    },
    {
      id: 3,
      name: "Shankar Shrestha",
      phone: "9821232425"
    }
  ]
  return (
    <div>
      <PhoneBook contacts = {contacts}/>
    </div>
  );
}
