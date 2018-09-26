import React from 'react'
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput } from 'react-admin'
import PeopleIcon from '@material-ui/icons/People'
export const LecturerIcon = PeopleIcon

export const LecturerList = (props) => (
  <List {...props} title="List of Lecturers">
    <Datagrid >
      <TextField source='name' />
      <EditButton basePath='/lecturers' />
    </Datagrid>
  </List>
)

const LecturerTitle = ({ record }) => {
  return <span>Lecturer {record ? `'${record.name}'` : ''}</span>
}

export const LecturerEdit = (props) => (
  <Edit title={<LecturerTitle />} {...props}>
    <SimpleForm>
      <TextInput source='name' />
    </SimpleForm>
  </Edit>
)

export const LecturerCreate = (props) => (
  <Create title='Create a Lecturer' {...props}>
    <SimpleForm>
      <TextInput source='name' />
    </SimpleForm>
  </Create>
)
