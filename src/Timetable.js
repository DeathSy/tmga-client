import React from 'react'
import WebIcon from '@material-ui/icons/Web'
import ListTimetable from './timetable/TimetableList'
import ShowTimetable from './timetable/Timetable'
// import ShowTimetable from './timetable/ShowTimetable'
export const TimetableIcon = WebIcon

export const TimetableList = props => <ListTimetable />

export const TimetableShow = props => (
  <ShowTimetable semester={props.semester} />
)
