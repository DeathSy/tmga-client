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
import LayersIcon from '@material-ui/icons/Layers'
export const SubjectFormatIcon = LayersIcon

export const SubjectFormatList = (props) => (
  <List {...props} title='Subject Type List'>
    <Datagrid>
      <TextField source='name' label='Subject Type' />
      <EditButton basePath='/subjectFormats' />
    </Datagrid>
  </List>
)

const SubjectFormatTitle = ({ record }) => {
  return <span>Subject Type{record ? `'${record.name}'` : ''}</span>
}

export const SubjectFormatEdit = (props) => (
  <Edit title={<SubjectFormatTitle />} {...props}>
    <SimpleForm>
      <TextInput source='name' />
    </SimpleForm>
  </Edit>
)

export const SubjectFormatCreate = (props) => (
  <Create title='Create a Subject Type' {...props}>
    <SimpleForm>
      <TextInput source='name' />
    </SimpleForm>
  </Create>
)
