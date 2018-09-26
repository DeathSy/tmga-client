import React from 'react'
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput
} from 'react-admin'
import WebIcon from '@material-ui/icons/Web'
import Timetable from './timetable/Timetable'
export const TimetableIcon = WebIcon

export const TimetableView = (props) => (
  <Timetable />
)
