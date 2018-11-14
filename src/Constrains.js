import React from 'react'
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  BooleanField,
  ReferenceField,
  SelectInput,
  ReferenceInput,
  DeleteButton,
  BooleanInput,
  SelectArrayInput
} from 'react-admin'
import Chip from '@material-ui/core/Chip'
import ReportIcon from '@material-ui/icons/Report'
import CheckIcon from '@material-ui/icons/CheckCircle'
export const ConstrainIcon = ReportIcon
const days = [
  { id: 'MON', name: 'Monday' },
  { id: 'TUE', name: 'Tuesday' },
  { id: 'WED', name: 'Wednesday' },
  { id: 'THU', name: 'Thursday' },
  { id: 'FRI', name: 'Friday' }
]

const TagsField = ({ record }) =>
  record.day.map((dayname, index) => (
    <Chip style={{ margin: 4 }} key={index} label={dayname} />
  ))

export const ConstrainList = (props) => (
  <List {...props} title='Constraints of teacher '>
    <Datagrid>
      <ReferenceField label='Lecturer Name' source='lecturerId' reference='lecturers' linkType={false} allowEmpty >
        <TextField source='name' />
      </ReferenceField>
      <ReferenceField label='Subject Name' source='subjectId' reference='subjects' linkType={false} allowEmpty >
        <TextField source='name' />
      </ReferenceField>
      <TagsField label='Day' />
      <ReferenceField label='Room' source='roomId' reference='rooms' linkType={false} allowEmpty >
        <TextField source='name' />
      </ReferenceField>
      <ReferenceField label='Start Time' source='startTimeId' reference='timeSlots' linkType={false} allowEmpty>
        <TextField source='start' />
      </ReferenceField>
      <ReferenceField label='End Time' source='endTimeId' reference='timeSlots' linkType={false} allowEmpty >
        <TextField source='end' />
      </ReferenceField>
      <BooleanField source='wants' label='Do' />
      <EditButton basePath='/constrains' />
      <DeleteButton />
    </Datagrid>
  </List>
)

const ConstrainTitle = ({ record }) => {
  return <span>Constraint : {record ? `'${record.id}'` : ''}</span>
}

export const ConstrainEdit = (props) => (
  <Edit title={<ConstrainTitle />} {...props}>
    <SimpleForm>
      <ReferenceInput label='Lecturer Name' source='lecturerId' reference='lecturers' >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Subject Name' source='subjectId' reference='subjects' >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <SelectArrayInput source='day' choices={days} optionText='name' />
      <ReferenceInput label='Room' source='roomId' reference='rooms' >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Start time' source='startTimeId' reference='timeSlots' sort={{ field: 'start', order: 'ASC' }}>
        <SelectInput optionText='start' />
      </ReferenceInput>
      <ReferenceInput label='End time' source='endTimeId' reference='timeSlots' sort={{ field: 'end', order: 'ASC' }}>
        <SelectInput optionText='end' />
      </ReferenceInput>
      <BooleanInput label='Do'
        source='wants'
        options={{
          checkedIcon: <CheckIcon />
        }} />
    </SimpleForm>
  </Edit>
)

export const ConstrainCreate = (props) => (
  <Create title='Create a Constraint' {...props}>
    <SimpleForm>
      <ReferenceInput label='Lecturer Name' source='lecturerId' reference='lecturers' >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Subject Name' source='subjectId' reference='subjects'>
        <SelectInput optionText='name' />
      </ReferenceInput>
      <SelectArrayInput source='day' choices={days} optionText='name' />
      <ReferenceInput label='Room' source='roomId' reference='rooms' >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Start time' source='startTimeId' reference='timeSlots' sort={{ field: 'start', order: 'ASC' }}>
        <SelectInput optionText='start' />
      </ReferenceInput>
      <ReferenceInput label='End time' source='endTimeId' reference='timeSlots' sort={{ field: 'end', order: 'ASC' }}>
        <SelectInput optionText='end' />
      </ReferenceInput>
      <BooleanInput label='Do'
        source='wants'
        options={{
          checkedIcon: <CheckIcon />
        }} />
    </SimpleForm>
  </Create>
)
