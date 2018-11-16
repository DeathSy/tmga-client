import React, { Component } from 'react'
import { Admin, Resource } from 'react-admin'
import loopbackRestClient, { authClient } from 'aor-loopback'
import { RoomList, RoomEdit, RoomCreate, RoomIcon } from './Rooms.js'
import {
  LecturerList,
  LecturerEdit,
  LecturerCreate,
  LecturerIcon
} from './Lecturers.js'
import {
  SubjectList,
  SubjectEdit,
  SubjectCreate,
  SubjectIcon
} from './Subjects.js'
import {
  SubjectFormatList,
  SubjectFormatEdit,
  SubjectFormatCreate,
  SubjectFormatIcon
} from './SubjectFormats.js'
import { TimetableList, TimetableShow, TimetableIcon } from './Timetable'
import Create from './create/index'
import Dashboard from './dashboard/Dashboard'
import tmgaTheme from './theme.js'
import AddIcon from '@material-ui/icons/PlaylistAdd'
const CreateIcon = AddIcon
const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)
// const authProvider = authClient(process.env.REACT_APP_AUTH_CLIENT)

class App extends Component {
  render () {
    return (
      <Admin
        dashboard={Dashboard}
        theme={tmgaTheme}
        title={'TMGA'}
        dataProvider={dataProvider}
      >
        {/* <Resource name='subjectSections' options={{ label: 'Create timetable' }} list={SectionList} edit={SectionEdit} create={SectionCreate} icon={SectionIcon} /> */}
        <Resource
          name='create'
          options={{ label: 'Create timetable' }}
          list={Create}
          icon={CreateIcon}
        />
        <Resource name='timetablesview' />
        <Resource
          name='timetables'
          options={{ label: 'Timetable' }}
          show={TimetableShow}
          list={TimetableList}
          icon={TimetableIcon}
        />
        <Resource
          name='rooms'
          list={RoomList}
          edit={RoomEdit}
          create={RoomCreate}
          icon={RoomIcon}
        />
        <Resource
          name='lecturers'
          list={LecturerList}
          edit={LecturerEdit}
          create={LecturerCreate}
          icon={LecturerIcon}
        />
        <Resource
          name='subjects'
          list={SubjectList}
          edit={SubjectEdit}
          create={SubjectCreate}
          icon={SubjectIcon}
        />
        {/* <Resource name='fixedSubjects' options={{ label: 'GEN & LNG' }} list={FixedSubjectList} edit={FixedSubjectEdit} create={FixedSubjectCreate} icon={FixedSubjectIcon} />
        <Resource name='constrains' options={{ label: 'Constraints' }} list={ConstrainList} edit={ConstrainEdit} create={ConstrainCreate} icon={ConstrainIcon} /> */}
        <Resource
          name='subjectFormats'
          options={{ label: 'Subject Type' }}
          list={SubjectFormatList}
          edit={SubjectFormatEdit}
          create={SubjectFormatCreate}
          icon={SubjectFormatIcon}
        />
        <Resource name='timeSlots' />
      </Admin>
    )
  }
}

export default App
