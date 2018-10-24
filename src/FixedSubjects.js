import React from 'react'
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  NumberField,
  TextField,
  EditButton,
  TextInput,
  NumberInput,
  BooleanInput,
  SelectArrayInput,
  ArrayField,
  SingleFieldList,
  ChipField,
  ArrayInput,
  BooleanField,
  ReferenceField,
  SelectInput,
  ReferenceInput,
  DeleteButton
} from 'react-admin'
import Chip from '@material-ui/core/Chip'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
export const FixedSubjectIcon = LibraryBooksIcon

// const choices = [
//   { id: 'Lecture', name: 'Lecture' },
//   { id: 'Lab', name: 'Lab' }
// ];
const TagsField = ({ record }) =>
  record.students.map((year, index) => (
    <Chip style={{ margin: 4 }} key={index} label={year} />
  ))

const years = [
  { id: '1st year', year: '1st year' },
  { id: '2nd year', year: '2nd year' },
  { id: '3rd year', year: '3rd year' },
  { id: '4th year', year: '4th year' }
]

export const FixedSubjectList = (props) => (
  <List {...props} title='Required Subject (GEN-LNG) '>
    <Datagrid>
      <TextField source='code' label='Subject Code' />
      <TextField source='name' label='Subject Name' />
      <ReferenceField label='Subject Type' source='subjectFormatId' reference='subjectFormats' linkType={false}>
        <TextField source='name' />
      </ReferenceField>
      <TagsField label='Student Year' />
      <EditButton basePath='/fixedsubjects' />
      <DeleteButton />
    </Datagrid>
  </List>
)

const FixedSubjectTitle = ({ record }) => {
  return <span>Subject {record ? `'${record.name}'` : ''}</span>
}

export const FixedSubjectEdit = (props) => (
  <Edit title={<FixedSubjectTitle />} {...props}>
    <SimpleForm>
      <TextInput source='name' />
      <TextInput source='code' />
      <ReferenceInput label='Type' source='subjectFormatId' reference='subjectFormats'>
        <SelectInput optionText='name' />
      </ReferenceInput>
      <SelectArrayInput source='students' choices={years} optionText='year' />
    </SimpleForm>
  </Edit>
)

export const FixedSubjectCreate = (props) => (
  <Create title='Create a Subject' {...props}>
    <SimpleForm>
      <TextInput source='code' />
      <TextInput source='name' />
      <SelectArrayInput source='students' choices={years} optionText='year' />
      <ReferenceInput label='Type' source='subjectFormatId' reference='subjectFormats'>
        <SelectInput optionText='name' />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
