import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import loopbackRestClient from 'aor-loopback'

const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)

class App extends Component {
  render () {
    return (
      <Admin dataProvider={dataProvider} >
        <Resource />
      </Admin>
    )
  }
}

export default App
