import React from 'react'
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, LongTextInput, DateInput } from 'react-admin'
import BookIcon from '@material-ui/icons/Room'
export const RoomIcon = BookIcon

export const RoomList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='building' />
      <TextField source='name' />
      <EditButton basePath='/rooms' />
    </Datagrid>
  </List>
)

const RoomTitle = ({ record }) => {
  return <span>Room {record ? `'${record.title}'` : ''}</span>
}

export const RoomEdit = (props) => (
  <Edit title={<RoomTitle />} {...props}>
    <SimpleForm>
      <TextInput source='building' />
      <TextInput source='name' />
    </SimpleForm>
  </Edit>
)

export const RoomCreate = (props) => (
  <Create title='Create a room' {...props}>
    <SimpleForm>
      <TextInput source='building' />
      <TextInput source='name' />
    </SimpleForm>
  </Create>
)