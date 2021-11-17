import logo from './logo.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import { Persons } from './components/Persons'

//peticiones a nuestro graphql
const ALL_PERSONS = gql`
query {
  allPersons {
    id
    name
    phone
    address {
      street
      city
    }
  }
}
`

function App() {
  // está 2 veces! En una nos devuelve la info que se está cargando (loading), sin resultados
  // la segunda vez ha terminado de cargar y nos devuelve los resultados
  // Hay que controlarlo
  const {data, error, loading} = useQuery(ALL_PERSONS) // el resultado es un OBJ


  // Petition to graphQl server ❌, podriamos hacerlo aqui pero no tiene sentido
  /*useEffect(() => {fetch('http://localhost:4000', {})
  */

  if (error) return <span style="color: red">{error}</span>
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {loading
          ? <p>Loading...</p>
          : <Persons persons={data?.allPersons} />
        }
      </header>
    </div>
  )
}

export default App
