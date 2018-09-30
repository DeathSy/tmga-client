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
  NumberInput,
  CardActions,
  CreateButton,
  RefreshButton
} from 'react-admin'
import axios from 'axios'
import { Grid, Button, Paper, Typography, Card, CardContent, CircularProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/PlaylistAdd'
export const SectionIcon = AddIcon
// const SectionActions = () => (
  //   <CardActions>
  //     <CreateButton />
  //     <RefreshButton />
  //     <Button primary ><AddIcon /> Create timetable</Button>
  //   </CardActions>
  // )
  
export class SectionList extends React.Component  {
  handleClick () {
    axios.post('http://ml.tmga.cf/timetables')
  }
  render () {
    return (
      <div>
        <Grid xs={12} style={{ margin: 10 }} >
          <Grid container justify='flex-end' >
            <Button variant='contained' color='primary' onClick={this.handleClick} >
              <AddIcon />  Create timetable
            </Button>
          </Grid>
        </Grid>
        <List {...this.props} title='Sections' >
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
      </div>

    )
  }
}

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
