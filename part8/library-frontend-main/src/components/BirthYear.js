import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ADD_YEAR, ALL_AUTHORS } from "../queries"
import Select from "react-select"

export default function BirthYear({ names }) {
  const [nameObj, setNameObj] = useState({})
  const [year, setYear] = useState("")

  const [setBirthday] = useMutation(ADD_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()

    const setBornTo = Number(year)
    const name = nameObj.value
    setBirthday({ variables: { name, setBornTo } })

    setNameObj({})
    setYear("")
  }

  const options = names.map((name) => {
    return { value: name, label: name }
  })

  return (
    <div>
      <h3>Set Birthday</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={nameObj}
            onChange={setNameObj}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  )
}
