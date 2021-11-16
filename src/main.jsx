import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider } from '@apollo/client'

// Petition to graphQl server ❌
const client = new ApolloClient({
  // Apollo posée una caché para sincronizar los cambios que hagas en esa caché, pero hay que configurarla porque si no peta
  cache: new InMemoryCache(),
  // donde queremos linkar
  link: new HttpLink({
    uri: 'http://localhost:4000' // esto suele venir desde las variables de entorno
  })
})

// client.query({ query }).then(res => console.log(res.data))

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// Con ApolloProvider usa el contexto para que el cliente esté disponible en toda la aplicacion o todos los componentes que estén dentro de App