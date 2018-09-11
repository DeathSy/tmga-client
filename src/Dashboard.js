// in src/Dashboard.js
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
export default () => (
  <Card>
    <Title title="Welcome to timetable scheduling system" />
    <CardContent>test dashboard</CardContent>
  </Card>
);