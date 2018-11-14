import React from 'react'
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  NumberField,
  EditButton,
  TextInput,
  NumberInput
} from 'react-admin'
import PersonIcon from '@material-ui/icons/Person'
export const StudentIcon = PersonIcon

export const StudentList = (props) => (
  <List {...props} >
    <Datagrid>
      <NumberField source='studentId' label='Student ID' />
      <TextField source='name' label='Student Name' />
      <EditButton basePath='/students' />
    </Datagrid>
  </List>
)

const StudentTitle = ({ record }) => {
  return <span>Student {record ? `'${record.name}'` : ''}</span>
}

export const StudentEdit = (props) => (
  <Edit title={<StudentTitle />} {...props}>
    <SimpleForm>
      <NumberInput source='studentId' label='Student ID' />
      <TextInput source='name' label='Student Name' />
    </SimpleForm>
  </Edit>
)

export const StudentCreate = (props) => (
  <Create title='Create a student' {...props}>
    <SimpleForm>
      <NumberInput source='studentId' label='Student ID' />
      <TextInput source='name' label='Student Name' />
    </SimpleForm>
  </Create>
)
