import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
import BookIcon from '@material-ui/icons/Room';
export const RoomIcon = BookIcon;

export const RoomList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="building" />
      <TextField source="name" />
      <EditButton basePath="/rooms" />
    </Datagrid>
  </List>
);

const RoomTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const RoomEdit = (props) => (
    <Edit title={<RoomTitle />} {...props}>
        <SimpleForm>
        <TextField source="building" />
      <TextField source="name" />
        </SimpleForm>
    </Edit>
);

export const RoomCreate = (props) => (
    <Create title="Create a Post" {...props}>
        <SimpleForm>
        <TextField source="building" />
      <TextField source="name" />
        </SimpleForm>
    </Create>
);