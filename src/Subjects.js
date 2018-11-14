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
  BooleanInput,
  SelectArrayInput,
  BooleanField,
  ReferenceField,
  SelectInput,
  ReferenceInput,
  DeleteButton
} from 'react-admin'
import Chip from '@material-ui/core/Chip'
import CollectionBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
export const SubjectIcon = CollectionBookmarkIcon

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

export const SubjectList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source='code' label='Subject Code' />
      <TextField source='name' label='Subject Name' />
      <ReferenceField
        label='Subject Type'
        source='subjectFormatId'
        reference='subjectFormats'
        linkType={false}
      >
        <TextField source='name' />
      </ReferenceField>
      <TagsField label='Student Year' />
      <BooleanField source='isRequired' label='Required' />
      <EditButton basePath='/subjects' />
      <DeleteButton />
    </Datagrid>
  </List>
)

const SubjectTitle = ({ record }) => {
  return <span>Subject {record ? `'${record.name}'` : ''}</span>
}

export const SubjectEdit = props => (
  <Edit title={<SubjectTitle />} {...props}>
    <SimpleForm>
      <TextInput source='name' />
      <TextInput source='code' />
      <ReferenceInput
        label='Type'
        source='subjectFormatId'
        reference='subjectFormats'
      >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <SelectArrayInput source='students' choices={years} optionText='year' />
      <BooleanInput label='Required' source='isRequired' />
    </SimpleForm>
  </Edit>
)

export const SubjectCreate = props => (
  <Create title='Create a Subject' {...props}>
    <SimpleForm>
      <TextInput source='code' />
      <TextInput source='name' />
      <SelectArrayInput source='students' choices={years} optionText='year' />
      <ReferenceInput
        label='Type'
        source='subjectFormatId'
        reference='subjectFormats'
      >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <BooleanInput label='Required' source='isRequired' />
    </SimpleForm>
  </Create>
)
