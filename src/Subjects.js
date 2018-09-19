import React from 'react'
import { List, Datagrid, Edit, Create, SimpleForm, NumberField, TextField, EditButton, TextInput, NumberInput, BooleanInput, SelectArrayInput, ArrayField } from 'react-admin'
import ClassIcon from '@material-ui/icons/Class'
export const SubjectIcon = ClassIcon

// const choices = [
//   { id: 'Lecture', name: 'Lecture' },
//   { id: 'Lab', name: 'Lab' }
// ];
const years = [
  { id: '1', name: '1st year' },
  { id: '2', name: '2nd year' },
  { id: '3', name: '3rd year' },
  { id: '4', name: '4th year' }
];

export const SubjectList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='code' label='Subject Code' />
      <TextField source='name' label='Subject Name' />
      <ArrayField source='year' />
      <NumberField source='sectionAmount' label='Section Amount' />
      <NumberField source='studentsPerSection' label='Students per section' />
      <EditButton basePath='/subjects' />
    </Datagrid>
  </List>
)

const SubjectTitle = ({ record }) => {
  return <span>Subject {record ? `'${record.title}'` : ''}</span>
}

export const SubjectEdit = (props) => (
  <Edit title={<SubjectTitle />} {...props}>
    <SimpleForm>
      <TextInput source='name' />
      <TextInput source='code' />
      <NumberInput source='sectionAmount' />
      <NumberInput source='studentsPerSection' />
      <SelectArrayInput source='year' choices={years} />
      <BooleanInput label='Compulsory' source='isCompulsory' />
    </SimpleForm>
  </Edit>
)

export const SubjectCreate = (props) => (
  <Create title='Create a Subject' {...props}>
    <SimpleForm>
      <TextInput source='code' />
      <TextInput source='name' />
      <NumberInput source='sectionAmount' />
      <NumberInput source='studentsPerSection' />
      <SelectArrayInput source='year' choices={years} />
      <BooleanInput label='Compulsory' source='isCompulsory' />
    </SimpleForm>
  </Create>
)
