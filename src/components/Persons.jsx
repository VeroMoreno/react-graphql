import React, { useEffect, useState } from "react"
import { gql, useLazyQuery } from '@apollo/client'

// Como usar parámetros para las querys / pasar variable a la query
// Para ello le damos nombre a la query y le pasamos por parámetro la $var, ahora ya se la puedes pasar a la query
const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

export const Persons = ({ persons }) => {
  // El resultado es un array de 2 posiciones
  // 1: cuando queremos activar la consulta | 2: resultado de la consulta
  const [getPerson, result] = useLazyQuery(FIND_PERSON)

  const [person, setPerson] = useState(null)
  console.log({person})
  // recibe el name
  const showPerson = name => {
    console.log(name)
    // llamamos a getPerson, tenemos las varialbes que le tienen que llegar, nameToSearch
    getPerson({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if(result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result])

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <p>{person.phone}</p>
        <p>{person.address.street}</p>
        <p>{person.address.city}</p>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    )
  }

  if (persons === null) return null

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(person =>
        <div key={person.id} onClick={() => { showPerson(person.name)}}>
        {person.name} {person.phone}
      </div>)}
    </div>
  )
}