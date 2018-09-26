import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import loopbackRestClient, { authClient } from 'aor-loopback'
import { RoomList, RoomEdit, RoomCreate, RoomIcon } from './Rooms.js'
import { LecturerList, LecturerEdit, LecturerCreate, LecturerIcon } from './Lecturers.js'
import { SubjectList, SubjectEdit, SubjectCreate, SubjectIcon } from './Subjects.js'
import { SectionList, SectionEdit, SectionCreate, SectionIcon } from './Sections.js'
import { SubjectFormatList, SubjectFormatEdit, SubjectFormatCreate, SubjectFormatIcon } from './SubjectFormats.js'
import { TimetableView, TimetableIcon } from './Timetable'
import { CreateView } from './CreateTimetable'
import Dashboard from './dashboard/Dashboard'
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
        <Resource name='subjectSections' options={{ label: 'Sections' }} list={SectionList} edit={SectionEdit} create={SectionCreate} icon={SectionIcon} />
        <Resource name='subjectFormats' options={{ label: 'Subject Type' }} list={SubjectFormatList} edit={SubjectFormatEdit} create={SubjectFormatCreate} icon={SubjectFormatIcon} />
        <Resource name='timetables' options={{ label: 'Timetable' }} list={TimetableView} icon={TimetableIcon} />
        <Resource name='createTimetable' options={{ label: 'Create timetable' }} list={CreateView} />
      </Admin>
    )
  }
}
export default App
