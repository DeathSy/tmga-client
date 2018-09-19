import React from 'react'
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput
} from 'react-admin'
import BookIcon from '@material-ui/icons/Room'
export const RoomIcon = BookIcon

export const RoomList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='building' />
      <TextField source='name' />
      <TextField source='capacity' />
      <ReferenceField label='Type' source='typeId' reference='subjectFormats' linkType={false}>
        <TextField source='name' />
      </ReferenceField>
      <EditButton basePath='/rooms' />
    </Datagrid>
  </List>
)

const RoomTitle = ({ record }) => {
  return <span>Room {record ? `'${record.name}'` : ''}</span>
}

export const RoomEdit = (props) => (
  <Edit title={<RoomTitle />} {...props}>
    <SimpleForm>
      <TextInput source='building' />
      <TextInput source='name' />
      <TextInput source='capacity' />
      <ReferenceInput label='Type' source='typeId' reference='subjectFormats'>
        <SelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const RoomCreate = (props) => (
  <Create title='Create a room' {...props}>
    <SimpleForm>
      <TextInput source='building' />
      <TextInput source='name' />
      <TextInput source='capacity' />
      <ReferenceInput label='Type' source='typeId' reference='subjectFormats'>
        <SelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
