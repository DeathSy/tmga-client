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
  SelectArrayField,
  ReferenceManyField,
  ReferenceArrayField
} from 'react-admin'
import Chip from '@material-ui/core/Chip'
import ClassIcon from '@material-ui/icons/Class'
export const SubjectIcon = ClassIcon

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

export const SubjectList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source='code' label='Subject Code' />
      <TextField source='name' label='Subject Name' />
      <ReferenceArrayField label='Subject Type' reference='subjectFormatsSubject' source='subjectId' >
        <SingleFieldList>
          <TextField source='name' />
        </SingleFieldList>
      </ReferenceArrayField>
      <TagsField label='Student Year' />
      <BooleanField source='isRequired' label='Required' />
      <EditButton basePath='/subjects' />
    </Datagrid>
  </List>
)

const SubjectTitle = ({ record }) => {
  return <span>Subject {record ? `'${record.name}'` : ''}</span>
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
      <SelectArrayInput source='students' choices={years} optionText='year' />
      <ReferenceField label='Subject Type' source='subjectFormatId' reference='subjectFormats'>
        <SelectArrayField />
      </ReferenceField>
      <BooleanInput label='Required' source='isRequired' />
    </SimpleForm>
  </Create>
)
