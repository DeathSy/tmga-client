import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import loopbackRestClient, { authClient } from 'aor-loopback'
import { RoomList, RoomEdit, RoomCreate, RoomIcon } from './Rooms.js'
const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)
const authProvider = authClient(process.env.REACT_APP_AUTH_CLIENT)

class App extends Component {
  render () {
    return (
      <Admin
        dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name='rooms' list={RoomList} edit={RoomEdit} create={RoomCreate} icon={RoomIcon} />
      </Admin>
    )
  }
}
export default App
