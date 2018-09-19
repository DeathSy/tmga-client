import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import loopbackRestClient, { authClient } from 'aor-loopback'
import { RoomList, RoomEdit, RoomCreate, RoomIcon } from './Rooms.js'
import { LecturerList, LecturerEdit, LecturerCreate, LecturerIcon } from './Lecturers.js'
import { SubjectList, SubjectEdit, SubjectCreate, SubjectIcon } from './Subjects.js'
import Dashboard from './Dashboard'
// import MyLayout from './MyLayout'
import tmgaTheme from './theme.js'
const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)
const authProvider = authClient(process.env.REACT_APP_AUTH_CLIENT)

class App extends Component {
  render () {
    return (
      <Admin dashboard={Dashboard}
        theme={tmgaTheme}
        title={'TMGA'}
        dataProvider={dataProvider} >
        <Resource name='rooms' list={RoomList} edit={RoomEdit} create={RoomCreate} icon={RoomIcon} />
        <Resource name='lecturers' list={LecturerList} edit={LecturerEdit} create={LecturerCreate} icon={LecturerIcon} />
        <Resource name='subjects' list={SubjectList} edit={SubjectEdit} create={SubjectCreate} icon={SubjectIcon} />
        <Resource name='subjectFormats' />
      </Admin>
    )
  }
}
export default App
