import React from 'react'
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton,TextInput } from 'react-admin'
import PeopleIcon from '@material-ui/icons/People'
export const LecturerIcon = PeopleIcon

export const LecturerList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='name' />
      <EditButton basePath='/lectuers' />
    </Datagrid>
  </List>
)

const LecturerTitle = ({ record }) => {
  return <span>Lecturer {record ? `'${record.title}'` : ''}</span>
};

export const LecturerEdit = (props) => (
  <Edit title={<LecturerTitle />} {...props}>
    <SimpleForm>
      <TextInput source='name' />
    </SimpleForm>
  </Edit>
);

export const LecturerCreate = (props) => (
  <Create title='Create a Lecturer' {...props}>
    <SimpleForm>
      <TextInput source='name' />
    </SimpleForm>
  </Create>
);