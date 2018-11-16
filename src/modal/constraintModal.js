import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import Chip from '@material-ui/core/Chip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import axios from 'axios'
import { GET_LIST } from 'react-admin'
import loopbackRestClient from 'aor-loopback'

const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200
  },
  actionContainer: {
    margin: theme.spacing.unit
  },
  button: {
    marginRight: theme.spacing.unit
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
})

const days = [
  { id: 'MON', name: 'Monday' },
  { id: 'TUE', name: 'Tuesday' },
  { id: 'WED', name: 'Wednesday' },
  { id: 'THU', name: 'Thursday' },
  { id: 'FRI', name: 'Friday' }
]

export class ConstraintModal extends React.Component {
  async componentWillMount () {
    dataProvider(GET_LIST, 'TimeSlots', {
      pagination: { page: 1, perPage: 26 },
      sort: { field: 'start', order: 'ASC' }
    })
      .then(response => response.data)
      .then(slots => {
        this.setState({ timeSlots: slots })
      })
    const subject = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/subjects`
    )
    const lecturers = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/lecturers`
    )
    const roomlist = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/rooms`
    )
    this.setState({
      subjects: subject.data,
      lecturers: lecturers.data,
      roomlist: roomlist.data
    })
  }

  state = {
    subjects: [],
    lecturers: [],
    roomlist: [],
    timeSlots: [],
    activeStep: 0,
    subjectName: undefined,
    lecturerName: undefined,
    day: [],
    roomName: undefined,
    required: false
  }

  handleSubmit = () => {
    this.props.onSubmit({
      lecturer: this.state.lecturerName,
      subject: this.state.subjectName,
      room: this.state.roomName,
      day: this.state.day,
      start: this.state.startTime,
      end: this.state.endTime,
      required: this.state.required
    })
    this.reset()
    this.props.onClick()
  }

  handleChange = key => event => this.setState({ [key]: event.target.value })

  reset = () => {
    this.setState({
      subjectName: undefined,
      lecturerName: undefined,
      day: [],
      roomName: undefined,
      startTime: undefined,
      endTime: undefined
    })
  }
  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked })
  }
  render () {
    const { subjects, lecturers, roomlist, timeSlots } = this.state
    const { open, classes } = this.props

    return (
      <Dialog
        open={open}
        onClose={() => {
          this.reset()
          this.props.onClick()
        }}
      >
        <DialogTitle>Add Constraint</DialogTitle>
        <DialogContent>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor='lecturerName'>
                Lecturer Name
              </InputLabel>
              <Select
                value={this.state.lecturerName || ''}
                onChange={this.handleChange('lecturerName')}
              >
                {lecturers.map(lecture => (
                  <MenuItem key={lecture.id} value={lecture.name}>
                    {lecture.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor='subjectName'>
                Subject name
              </InputLabel>
              <Select
                value={this.state.subjectName || ''}
                onChange={this.handleChange('subjectName')}
              >
                {subjects.map(subject => (
                  <MenuItem key={subject.id} value={subject.code}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor='day'>
                Day
              </InputLabel>
              <Select
                multiple
                value={this.state.day || ''}
                onChange={this.handleChange('day')}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={JSON.parse(value).id}
                        label={JSON.parse(value).id}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {days.map(d => (
                  <MenuItem key={d.name} value={JSON.stringify(d)}>
                    {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor='roomName'>
                Room
              </InputLabel>
              <Select
                value={this.state.roomName || ''}
                onChange={this.handleChange('roomName')}
              >
                {roomlist.map(r => (
                  <MenuItem key={r.name} value={r.name}>
                    {r.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor='startTime'>
                Start Time
              </InputLabel>
              <Select
                value={this.state.startTime}
                onChange={this.handleChange('startTime')}
              >
                {timeSlots.map(slot => (
                  <MenuItem key={slot.id} value={slot.end}>
                    {slot.start}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor='endTime'>
                End Time
              </InputLabel>
              <Select
                value={this.state.endTime}
                onChange={this.handleChange('endTime')}
              >
                {timeSlots.map(slot => (
                  <MenuItem key={slot.id} value={slot.end}>
                    {slot.end}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.required}
                  onChange={this.handleChangeCheck('required')}
                  value='true'
                />
              }
              label='Required'
            />
            <div className={classes.actionContainer}>
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={this.handleSubmit}
              >
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ConstraintModal)
