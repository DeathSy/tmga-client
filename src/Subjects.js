import React from 'react'
import { List, Datagrid, Edit, Create, SimpleForm, NumberField, TextField, EditButton, TextInput, NumberInput, BooleanInput, ArrayField, SingleFieldList, ChipField } from 'react-admin'
import ClassIcon from '@material-ui/icons/Class'
export const SubjectIcon = ClassIcon

export const SubjectList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='code' label='Subject Code' />
      <TextField source='name' label='Subject  Name' />
      <ArrayField source='id'>
        <SingleFieldList>
          <ChipField source='formats' label='Subject Type' />
        </SingleFieldList>
      </ArrayField>
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
      <BooleanInput label='Compulsory' source='isCompulsory' />
    </SimpleForm>
  </Create>
)
