import React, { Component } from 'react'
import moment from 'moment';
import axios from 'axios'

import TimeTable from 'react-timetable-events'

export default class TimetableEvent extends Component {

  state = {
    data: {},
    events: {
      MON: [],
      TUE: [],
      WED: [],
      THU: [],
      FRI: []
    },
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
    }
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
        <span className={styles.event_info} style={{ fontWeight: 'bold' }}>
           { event.name } 
        </span>
        <span className={styles.event_info} style={{ fontSize: 12 }}>
           { event.room } 
        </span>
        <span className={styles.event_info} style={{ fontSize: 12 }}>
          { event.startTime.format('HH:mm') } - { event.endTime.format('HH:mm') }
        </span>
      </div>
    )
  }

  render () {
    return (
      <TimeTable
        events={this.state.events}
        renderHour={this.renderHour}
        renderEvent={this.renderEvent}
        hoursInterval={[ 8, 21 ]}
        timeLabel="Time :)"
      />
    )
  }
}