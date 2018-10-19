import React, { Component } from 'react'
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.less';
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';
import loopbackRestClient from 'aor-loopback'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';

import TimeTable from 'react-timetable-events'
import { Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)

class TimetableEvent extends Component {


  state= {
    data: {},
    events: {
      MON: [],
      TUE: [],
      WED: [],
      THU: [],
      FRI: []
    },
    timelist: [],
    eventlist: [],
  }


  componentWillMount = async () => {
    const { data } = await axios.get('http://ml.tmga.cf/timetables/2/2018')
    this.setState({ data })
    const { year } = this.props
    const section = data.Sections.filter(section => {
      return section.Section.Subject.students.includes(year)
    })
   
    const sectionDay = { MON:[], TUE:[], WED:[], THU:[], FRI:[] }
    section.forEach((section,index) => {
      const startTime = section.Time[0].start
      const endTime = section.Time[section.Time.length-1].end
      let before= 0
      sectionDay[section.day].sort()
    // if(sectionDay[section.day].length!==0){
    //   before = (sectionDay[section.day].length-1)
    //   sectionDay[section.day].push({
    //     id: `${section.Section.subjectId}-${section.Section.name}-${section.Section.type}`,
    //     name: `${section.Section.Subject.code}-${section.Section.Subject.name} (${section.Section.name})`,
    //     room: ` (${section.Room.name})`,
    //     type: `custom`,
    //     startTime: moment("1996-11-13T"+startTime.slice(0, 2)+":"+startTime.slice(2)+":00"),
    //     endTime: moment("1996-11-13T"+endTime.slice(0, 2)+":"+endTime.slice(2)+":00"),
    //     before: moment(sectionDay[section.day][before].endTime)
    //   })
    // }else{
    //   before =0 
    //   sectionDay[section.day].push({
    //     id: `${section.Section.subjectId}-${section.Section.name}-${section.Section.type}`,
    //     name: `${section.Section.Subject.code}-${section.Section.Subject.name} (${section.Section.name})`,
    //     room: ` (${section.Room.name})`,
    //     type: `custom`,
    //     startTime: moment("1996-11-13T"+startTime.slice(0, 2)+":"+startTime.slice(2)+":00"),
    //     endTime: moment("1996-11-13T"+endTime.slice(0, 2)+":"+endTime.slice(2)+":00"),
    //     before: 0
    //   })
    // }
    sectionDay[section.day].push({
        id: `${section.Section.subjectId}-${section.Section.name}-${section.Section.type}`,
        name: `${section.Section.Subject.code}-${section.Section.Subject.name} (${section.Section.name})`,
        room: ` (${section.Room.name})`,
        type: `custom`,
        startTime: startTime,
        endTime: endTime,
        space: (moment.duration(moment("1996-11-13T"+startTime.slice(0, 2)+":"+startTime.slice(2)+":00").diff(moment("1996-11-13T08:00:00")))).asMinutes()/30,
        slot: (moment.duration(moment("1996-11-13T"+endTime.slice(0, 2)+":"+endTime.slice(2)+":00").diff(moment("1996-11-13T"+startTime.slice(0, 2)+":"+startTime.slice(2)+":00")))).asMinutes()/30
      })
    });
    this.setState({ events: sectionDay })
    console.log('test', this.state.events)
  }

  componentWillReceiveProps = () => {
    const { year } = this.props
    const { data } = this.state
    if (data.Sections) {
      const section = data.Sections.filter(section => {
        return section.Section.Subject.students.includes(year)
      })
      const sectionDay = { MON:[], TUE:[], WED:[], THU:[], FRI:[] }
      section.forEach(section => {
        const startTime = section.Time[0].start
        const endTime = section.Time[section.Time.length-1].end
  
        sectionDay[section.day].push({
          id: `${section.Section.subjectId}-${section.Section.name}-${section.Section.type}`,
          name: `${section.Section.Subject.code}-${section.Section.Subject.name} (${section.Section.name})`,
          room: ` (${section.Room.name})`,
          type: 'custom',
          startTime: moment("1996-11-13T"+startTime.slice(0, 2)+":"+startTime.slice(2)+":00"),
          endTime: moment("1996-11-13T"+endTime.slice(0, 2)+":"+endTime.slice(2)+":00")
        })
      });
      this.setState({ events: sectionDay })
    }
    
  }

  componentDidMount(){

      dataProvider(GET_LIST,'TimeSlots', {
        pagination: { page: 1, perPage: 20 },
        sort: { field: 'start', order: 'ASC' },
      }).then(response => response.data)
      .then(slots => {
        const timeslot = slots.map((slot) =>(
          <TableCell>{slot.start+' - '+slot.end}</TableCell>
        )
        )
        this.setState({timelist: timeslot});
        console.log('time', this.state.timelist)
      });
  }

  renderHour(hour, defaultAttributes, styles) {
    return (
      <div {...defaultAttributes}
           key={hour}>
        {hour}h
      </div>
    );
  }

  renderEvent(event, defaultAttributes, styles) {
    return (
      <div {...defaultAttributes}
           title={event.name}
           key={event.id}

        >
        <span className={styles.event_info} style={{ fontWeight: 'bold',fontSize: 15 ,color: "#4a4f56", fontFamily: 'Roboto, serif', fontWeight: 'bold' }}>
           { event.name } 
        </span>
        <span className={styles.event_info} style={{ fontSize: 12, color: "#4a4f56", fontFamily: 'Roboto, serif', }}>
           { event.room } 
        </span>
        <span className={styles.event_info} style={{ fontSize: 12 , color: "#4a4f56", fontFamily: 'Roboto, serif',}}>
          { event.startTime.format('HH:mm') } - { event.endTime.format('HH:mm') }
        </span>
      </div>
    )
  }

  render () {
    return (
      <Table >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {this.state.timelist}
          </TableRow>
        </TableHead>
        <TableBody>
          { this.state.events.MON.length ==0 ? <TableRow><TableCell > MONDAY </TableCell><TableCell colSpan={25}></TableCell>  </TableRow>: null }
          { this.state.events.MON.map( (monday,index) => {
            return <TableRow>
              {index==0? <TableCell rowSpan={this.state.events.MON.length}> MONDAY </TableCell> : null}
              <TableCell colspan={monday.space}></TableCell>
              <TableCell colspan={monday.slot} style={{ textAlign: 'center', backgroundColor: '#ffff66'}}>
              {monday.name}{monday.room}( {monday.startTime} - {monday.endTime} )</TableCell>
              </TableRow>
          })}
          { this.state.events.TUE.length ==0 ? <TableRow><TableCell > TUESDAY </TableCell><TableCell colSpan={25}></TableCell> </TableRow>: null }
          {this.state.events.TUE.map( (monday,index) => {
            return <TableRow>
              {index==0? <TableCell rowSpan={this.state.events.MON.length}> MONDAY </TableCell> : null}
              <TableCell colspan={monday.space}></TableCell>
              <TableCell colspan={monday.slot} style={{ textAlign: 'center', backgroundColor: 'yellow'}}>
              {monday.name}{monday.room}( {monday.startTime} - {monday.endTime} )</TableCell>
              </TableRow>
          })}
          { this.state.events.WED.length ==0 ? <TableRow><TableCell > WEDNESDAY </TableCell><TableCell colSpan={25}></TableCell>  </TableRow>: null }
          {this.state.events.WED.map( (wednesday,index) => {
            return <TableRow>
              {index==0? <TableCell rowSpan={this.state.events.WED.length}> WEDNESDAY </TableCell> : null}
              <TableCell colspan={wednesday.space}></TableCell>
              <TableCell colspan={wednesday.slot} style={{ textAlign: 'center', backgroundColor: '#66cc66'}}>
              {wednesday.name}{wednesday.room}( {wednesday.startTime} - {wednesday.endTime} )</TableCell>
              </TableRow>
          })}
          { this.state.events.THU.length ==0 ? <TableRow><TableCell > THURSDAY </TableCell><TableCell colSpan={25}></TableCell>  </TableRow>: null }
          {this.state.events.THU.map( (thursday,index) => {
            return <TableRow>
              {index==0? <TableCell rowSpan={this.state.events.THU.length}> THURSDAY </TableCell> : null}
              <TableCell colspan={thursday.space}></TableCell>
              <TableCell colspan={thursday.slot} style={{ textAlign: 'center', backgroundColor: '#66cc66'}}>
              {thursday.name}{thursday.room}( {thursday.startTime} - {thursday.endTime} )</TableCell>
              </TableRow>
          })}
          { this.state.events.FRI.length ==0 ? <TableRow><TableCell > FRIDAY </TableCell><TableCell colSpan={25}></TableCell>  </TableRow>: null }
          {this.state.events.FRI.map( (friday,index) => {
            return <TableRow>
              {index==0? <TableCell rowSpan={this.state.events.FRI.length}> FRIDAY </TableCell> : null}
              <TableCell colspan={friday.space}></TableCell>
              <TableCell colspan={friday.slot} style={{ textAlign: 'center', backgroundColor: '#80aaff'}}>
              {friday.name}{friday.room}( {friday.startTime} - {friday.endTime} )</TableCell>
              </TableRow>
          })}
          {/* {Object.keys(MON).map(day => 
          Object.keys(MON[day]).map(room => MON[day][room].map((section, index) => {
            if (index === 0) {
              return <TableCell colspan={section.slot} style={{ textAlign: 'center'}}>{section.name}</TableCell>
            }
            return (
                <TableCell colspan={section.slot} style={{ textAlign: 'center'}}>{section.name}</TableCell>
            )}
          )))} */}
        </TableBody>
      </Table>
      // <TimeTable
      //   events={this.state.events}
      //   renderHour={this.renderHour}
      //   renderEvent={this.renderEvent}
      //   hoursInterval={[ 8, 21 ]}
      //   timeLabel="Time :)"
      // />
    )
  }
}
export default withStyles(styles)(TimetableEvent)