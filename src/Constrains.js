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
} from 'react-admin'
import ReportIcon from '@material-ui/icons/Report'
import CheckIcon from '@material-ui/icons/CheckCircle'
export const ConstrainIcon = ReportIcon
const days = [
  { id: 'MON', year: 'Monday' },
  { id: 'TUE', year: 'Tuesday' },
  { id: 'WED', year: 'Wednesday' },
  { id: 'THU', year: 'Thursday' },
  { id: 'FRI', year: 'Friday' }
]

export const ConstrainList = (props) => (
  <List {...props} title='Constraints of teacher '>
    <Datagrid>
      <TextField source='day' />
      <ReferenceField label='Lecturer Name' source='lecturerId' reference='lecturers' linkType={false}>
        <TextField source='name' />
      </ReferenceField>
      <ReferenceField label='Room' source='roomId' reference='rooms' linkType={false}>
        <TextField source='name' />
      </ReferenceField>
      <ReferenceField label='Subject Name' source='subjectId' reference='subjects' linkType={false}>
        <TextField source='name' />
      </ReferenceField>
      <ReferenceField label='Start Time' source='startTimeId' reference='timeSlots' linkType={false}>
        <TextField source='start' />
      </ReferenceField>
      <ReferenceField label='End Time' source='endTimeId' reference='timeSlots' linkType={false}>
        <TextField source='end' />
      </ReferenceField>
      <BooleanField source='wants' label='Required' />
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
      <BooleanInput label='Required' 
        source='wants'
        options={{
          checkedIcon: <CheckIcon />
        }} />
      <SelectInput source='day' choices={days} optionText='day' />
      <ReferenceInput label='Lecturer Name' source='lecturerId' reference='lecturers' >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Room' source='roomId' reference='rooms' >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Subject Name' source='subjectId' reference='subjects'>
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Start time' source='startTimeId' reference='timeSlots' sort={{ field: 'start', order: 'ASC' }}>
        <SelectInput optionText='start' />
      </ReferenceInput>
      <ReferenceInput label='End time' source='endTimeId' reference='timeSlots' sort={{ field: 'end', order: 'ASC' }}>
        <SelectInput optionText='end' />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const ConstrainCreate = (props) => (
  <Create title='Create a Constraint' {...props}>
    <SimpleForm>
      <BooleanInput label='Do'
        source='wants'
        options={{
          checkedIcon: <CheckIcon />
        }} />
      <SelectInput source='day' choices={days} optionText='day' />
      <ReferenceInput label='Lecturer Name' source='lecturerId' reference='lecturers' >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Room' source='roomId' reference='rooms' >
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Subject Name' source='subjectId' reference='subjects'>
        <SelectInput optionText='name' />
      </ReferenceInput>
      <ReferenceInput label='Start time' source='startTimeId' reference='timeSlots' sort={{ field: 'start', order: 'ASC' }}>
        <SelectInput optionText='start' />
      </ReferenceInput>
      <ReferenceInput label='End time' source='endTimeId' reference='timeSlots' sort={{ field: 'end', order: 'ASC' }}>
        <SelectInput optionText='end' />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
