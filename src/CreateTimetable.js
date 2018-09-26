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
import Createtable from './createtimetable/CreateTable'
export const TimetableIcon = WebIcon

export const CreateView = (props) => (
  <Createtable />
)
