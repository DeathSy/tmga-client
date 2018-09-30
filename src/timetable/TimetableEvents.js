import React, { Component } from 'react'
import moment from 'moment';
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
          name: `${section.Section.Subject.name} (${section.Room.name})`,
          type: 'custom',
          startTime: moment("1996-11-13T"+startTime.slice(0, 2)+":"+startTime.slice(2)+":00"),
          endTime: moment("1996-11-13T"+endTime.slice(0, 2)+":"+endTime.slice(2)+":00")
        })
      });
      this.setState({ events: sectionDay })
      console.log('event', this.state.events)
    }
  }

  componentDidMount(){

      // dataProvider(GET_LIST,'TimeSlots', {
      //   pagination: { page: 1, perPage: 20 },
      //   sort: { field: 'start', order: 'ASC' },
      // }).then(response => response.data)
      // .then(slots => {
      //   const timeslot = slots.map((slot) =>(
      //     <TableCell>{slot.start+' - '+slot.end}</TableCell>
      //   )
      //   )
      //   this.setState({timelist: timeslot});
      //   console.log('events',this.state.timelist)
      // });
      


     
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
    const { classes } = this.props;
    const { MON } = this.state.events
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {this.state.timelist}
          </TableRow>
        </TableHead>
        <TableBody>
         
          {Object.keys(MON).map(day => 
          Object.keys(MON[day]).map(room => MON[day][room].map((section, index) => {
            if (index === 0) {
              return <TableCell colspan={section.slot} style={{ textAlign: 'center'}}>{section.name}</TableCell>
            }
            return (
                <TableCell colspan={section.slot} style={{ textAlign: 'center'}}>{section.name}</TableCell>
            )}
          )))}
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