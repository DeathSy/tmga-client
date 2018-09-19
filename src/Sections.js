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
  ChipField
} from 'react-admin'
import Chip from '@material-ui/core/Chip'
import PeopleIcon from '@material-ui/icons/People'
export const SectionIcon = PeopleIcon

// const LecturerField = ({ record }) =>
//   record.sections.map(item => (
//     <Chip style={{ margin: 4 }} label={item.lecturers} />
//   ))

export const SectionList = (props) => (
  <List {...props} title='List of Lecturers'>
    <Datagrid>
      <ArrayField source='sections'>
        <Datagrid>
          <TextField source='name' />
          <ReferenceField label='Subject Name' source='subjectId' reference='subjects' linkType={false}>
            <TextField source='name' />
          </ReferenceField>
          <ReferenceField label='Subject Type' source='type' reference='subjectFormats' linkType={false}>
            <TextField source='name' />
          </ReferenceField>
          <ReferenceArrayField label='Lecturers' reference='lecturers' source='lecturers'>
            <SingleFieldList>
              <ChipField source='name' />
            </SingleFieldList>
          </ReferenceArrayField>
        </Datagrid>
      </ArrayField>
      <EditButton basePath='/subjectSections' />
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
          <ReferenceArrayInput source='lecturers' reference='lecturers'>
            <SelectArrayInput optionText='name' />
          </ReferenceArrayInput>
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
          <TextInput source='name' />
          <ReferenceInput label='Subject' source='subjectId' reference='subjects'>
            <SelectInput optionText='name' optionValue='id' />
          </ReferenceInput>
          <ReferenceInput label='Type' source='type' reference='subjectFormats'>
            <SelectInput optionText='name' optionValue='id' />
          </ReferenceInput>
          <ReferenceArrayInput source='lecturers' reference='lecturers'>
            <SelectArrayInput optionText='name' />
          </ReferenceArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
)
