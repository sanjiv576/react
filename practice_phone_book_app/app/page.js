import Phonebook from "@/components/Phonebook";

export default function Home() {

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
      <Phonebook  contacts={contacts}/>
    </div>
  )
}
