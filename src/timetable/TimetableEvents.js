import React, { Component } from 'react'
import moment from 'moment';
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';
import loopbackRestClient from 'aor-loopback'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';

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
      sectionDay[section.day].sort()
      sectionDay[section.day].push({
        id: `${section.Section.subjectId}-${section.Section.name}-${section.Section.type}`,
        name: `${section.Section.Subject.code}-${section.Section.Subject.name} (${section.Section.name})`,
        room: ` ${section.Room.name}`,
        type: `custom`,
        startTime: startTime.slice(0, 2)+":"+startTime.slice(2),
        endTime: endTime.slice(0, 2)+":"+endTime.slice(2),
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
          room: ` ${section.Room.name}`,
          type: `custom`,
          startTime: startTime.slice(0, 2)+":"+startTime.slice(2),
          endTime: endTime.slice(0, 2)+":"+endTime.slice(2),
          space: (moment.duration(moment("1996-11-13T"+startTime.slice(0, 2)+":"+startTime.slice(2)+":00").diff(moment("1996-11-13T08:00:00")))).asMinutes()/30,
          slot: (moment.duration(moment("1996-11-13T"+endTime.slice(0, 2)+":"+endTime.slice(2)+":00").diff(moment("1996-11-13T"+startTime.slice(0, 2)+":"+startTime.slice(2)+":00")))).asMinutes()/30
        })
      });
      this.setState({ events: sectionDay })
    }
    
  }

  componentDidMount(){

      dataProvider(GET_LIST,'TimeSlots', {
        pagination: { page: 1, perPage: 26 },
        sort: { field: 'start', order: 'ASC' },
      }).then(response => response.data)
      .then(slots => {
        const timeslot = slots.map((slot) =>(
          <td align='center'>{slot.start.slice(0, 2)+":"+slot.start.slice(2)+' - '+slot.end.slice(0,2)+":"+slot.end.slice(2)}</td>
        )
        )
        this.setState({timelist: timeslot});
        console.log('time', this.state.timelist)
      });
  }

  render () {
    return (
      <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <td>Day/Time</td>
            {this.state.timelist}
          </tr>
        </thead>
        <tbody>
          { this.state.events.MON.length ==0 ? <tr><td > MONDAY </td><td colSpan={26}></td>  </tr>: null }
          { this.state.events.MON.map( (monday,index) => {
            return <tr>
              {index==0? <td rowSpan={this.state.events.MON.length}> MONDAY </td> : null}
              <td colspan={monday.space}></td>
              <td colspan={monday.slot} style={{ textAlign: 'center', backgroundColor: '#fffd8c'}}>
              <b>{monday.name}</b> <br></br> {monday.room} ( {monday.startTime} - {monday.endTime} )</td>
              {monday.space+monday.slot<26?<td colspan={26-monday.space-monday.slot}></td>: null}
              </tr>
          })}
          { this.state.events.TUE.length ==0 ? <tr><td > TUESDAY </td><td colSpan={26}></td> </tr>: null }
          {this.state.events.TUE.map( (tuesday,index) => {
            return <tr>
              {index==0? <td rowSpan={this.state.events.TUE.length}> TUESDAY </td> : null}
              <td colspan={tuesday.space}></td>
              <td colspan={tuesday.slot} style={{ textAlign: 'center', backgroundColor: '#ffafa3'}}>
              <b>{tuesday.name}</b> <br></br> {tuesday.room} ( {tuesday.startTime} - {tuesday.endTime} )</td>
              {tuesday.space+tuesday.slot<26?<td colspan={26-tuesday.space-tuesday.slot}></td>:null}
              </tr>
          })}
          { this.state.events.WED.length ==0 ? <tr><td > WEDNESDAY </td><td colSpan={26}></td>  </tr>: null }
          {this.state.events.WED.map( (wednesday,index) => {
            return <tr>
              {index==0? <td rowSpan={this.state.events.WED.length}> WEDNESDAY </td> : null}
              <td colspan={wednesday.space}></td>
              <td colspan={wednesday.slot} style={{ textAlign: 'center', backgroundColor: '#cbff8c'}}>
              <b>{wednesday.name} </b><br></br> {wednesday.room} ( {wednesday.startTime} - {wednesday.endTime} )</td>
              {wednesday.space+wednesday.slot<26?<td colspan={26-wednesday.space-wednesday.slot}></td>:null}
              </tr>
          })}
          { this.state.events.THU.length ==0 ? <tr><td > THURSDAY </td><td colSpan={26}></td>  </tr>: null }
          {this.state.events.THU.map( (thursday,index) => {
            return <tr>
              {index==0? <td rowSpan={this.state.events.THU.length}> THURSDAY </td> : null}
              <td colspan={thursday.space}></td>
              <td colspan={thursday.slot} style={{ textAlign: 'center', backgroundColor: '#ffd88c'}}>
              <b>{thursday.name} </b> <br></br> {thursday.room} ( {thursday.startTime} - {thursday.endTime} )</td>
              {thursday.space+thursday.slot<26?<td colspan={26-thursday.space-thursday.slot}></td>:null}
              </tr>
          })}
          { this.state.events.FRI.length ==0 ? <tr><td > FRIDAY </td><td colSpan={26}></td>  </tr>: null }
          {this.state.events.FRI.map( (friday,index) => {
            return <tr>
              {index==0? <td rowSpan={this.state.events.FRI.length}> FRIDAY </td> : null}
              <td colspan={friday.space}></td>
              <td colspan={friday.slot} style={{ textAlign: 'center', backgroundColor: '#b1c1db'}}>
              <b>{friday.name}</b> <br></br> {friday.room} ( {friday.startTime} - {friday.endTime} )</td>
              {friday.space+friday.slot<26?<td colspan={26-friday.space-friday.slot}></td>:null}
              </tr>
          })}
          {/* {Object.keys(MON).map(day => 
          Object.keys(MON[day]).map(room => MON[day][room].map((section, index) => {
            if (index === 0) {
              return <td colspan={section.slot} style={{ textAlign: 'center'}}>{section.name}</TableCell>
            }
            return (
                <TableCell colspan={section.slot} style={{ textAlign: 'center'}}>{section.name}</TableCell>
            )}
          )))} */}
        </tbody>
        </table>
        </div>
    )
  }
}
export default withStyles(styles)(TimetableEvent)