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
  ArrayField,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  SelectInput,
  ReferenceField,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  DeleteButton,
  NumberField,
  NumberInput
} from 'react-admin'
import Chip from '@material-ui/core/Chip'
import ListIcon from '@material-ui/icons/List'
import { withStyles } from '@material-ui/core/styles'
export const SectionIcon = ListIcon

// const LecturerField = ({ record }) =>
//   record.sections.map(item => (
//     <Chip style={{ margin: 4 }} label={item.lecturers} />
//   ))

export const SectionList = (props) => (
  <List {...props} title='Sections'>
    <Datagrid>
      <ArrayField source='sections'>
        <Datagrid >
          <TextField source='name' />
          <ReferenceField label='Subject Name' source='subjectId' reference='subjects' linkType={false} >
            <TextField source='code' />
          </ReferenceField>
          <ReferenceField label='Subject Name' source='subjectId' reference='subjects' linkType={false}>
            <TextField source='name' />
          </ReferenceField>
          <ReferenceField label='Subject Type' source='type' reference='subjectFormats' linkType={false}>
            <TextField source='name' />
          </ReferenceField>
          <ReferenceArrayField label='Lecturers' reference='lecturers' source='lecturers' >
            <SingleFieldList>
              <ChipField source='name' />
            </SingleFieldList>
          </ReferenceArrayField>
          <NumberField source='time' />
        </Datagrid>
      </ArrayField>
      <EditButton basePath='/subjectSections' />
      <DeleteButton />
    </Datagrid>
  </List>
)

const SectionTitle = ({ record }) => {
  return <span>Section {record ? `'${record.id}'` : ''}</span>
}

export const SectionEdit = (props) => (
  <Edit title={<SectionTitle />} {...props}>
    <SimpleForm>
      <ArrayInput source='sections'>
        <SimpleFormIterator>
          <TextInput source='name' />
          <ReferenceInput label='Subject' source='subjectId' reference='subjects'>
            <SelectInput optionText='name' optionValue='id' />
          </ReferenceInput>
          <ReferenceInput label='Type' source='type' reference='subjectFormats'>
            <SelectInput optionText='name' optionValue='id' />
          </ReferenceInput>
          <ReferenceArrayInput label='Lecturers' source='lecturers' reference='lecturers' perPage={100}>
            <SelectArrayInput optionText='name' />
          </ReferenceArrayInput>
          <NumberInput label='Time(minutes)' source='time' />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
)

export const SectionCreate = (props) => (
  <Create title='Create a Section' {...props}>
    <SimpleForm>
      <ArrayInput source='sections'>
        <SimpleFormIterator>
          <TextInput source='name' label='Name' />
          <ReferenceInput label='Subject' source='subjectId' reference='subjects'>
            <SelectInput optionText='name' optionValue='id' />
          </ReferenceInput>
          <ReferenceInput label='Type' source='type' reference='subjectFormats'>
            <SelectInput optionText='name' optionValue='id' />
          </ReferenceInput>
          <ReferenceArrayInput label='Lecturers' source='lecturers' reference='lecturers' perPage={100}>
            <SelectArrayInput optionText='name' />
          </ReferenceArrayInput>
          <NumberInput label='Time (minutes)' source='time' />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
)
