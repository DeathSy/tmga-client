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
import ClassIcon from '@material-ui/icons/Class'
export const SubjectFormatIcon = ClassIcon

export const SubjectFormatList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='name' label='Subject Type' />
      <EditButton basePath='/subjects' />
    </Datagrid>
  </List>
)

const SubjectFormatTitle = ({ record }) => {
  return <span>Subject {record ? `'${record.name}'` : ''}</span>
}

export const SubjectFormatEdit = (props) => (
  <Edit title={<SubjectFormatTitle />} {...props}>
    <SimpleForm>
      <TextInput source='name' />
    </SimpleForm>
  </Edit>
)

export const SubjectFormatCreate = (props) => (
  <Create title='Create a Subject' {...props}>
    <SimpleForm>
      <TextInput source='name' />
    </SimpleForm>
  </Create>
)
