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
import Chip from '@material-ui/core/Chip'
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
  },
  nextButton: {
    float: 'right'
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
  }

  state = {
    timeSlots: [],
    activeStep: 0,
    department: undefined,
    day: []
  }

  handleSubmit = () => {
    this.props.onSubmit({
      department: this.state.department,
      day: this.state.day,
      start: !this.state.startTime ? '' : JSON.parse(this.state.startTime),
      end: !this.state.endTime ? '' : JSON.parse(this.state.endTime)
    })
    this.reset()
    this.props.onClick()
  }

  handleChange = key => event => this.setState({ [key]: event.target.value })

  reset = () => {
    this.setState({
      department: undefined,
      day: [],
      startTime: undefined,
      endTime: undefined
    })
  }

  checkStep = () => {
    const { activeStep, department, day, startTime, endTime } = this.state
    if (activeStep === 0 && !department) {
      return true
    }
    if (activeStep === 0 && !day) {
      return true
    }
    if (activeStep === 0 && !startTime) {
      return true
    }
    if (activeStep === 0 && !endTime) {
      return true
    }

    return false
  }
  render () {
    const { timeSlots } = this.state
    const { open, classes } = this.props

    return (
      <Dialog
        open={open}
        onClose={() => {
          this.reset()
          this.props.onClick()
        }}
      >
        <DialogTitle>Add Fixed Condition</DialogTitle>
        <DialogContent>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor='department'>
                Department
              </InputLabel>
              <Select
                value={this.state.department || ''}
                onChange={this.handleChange('department')}
              >
                <MenuItem value={'IT'}>Information Technology</MenuItem>
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
                        key={value.id}
                        label={value.id}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                {days.map(d => (
                  <MenuItem key={d.name} value={d}>
                    {d.name}
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
                onChange={this.handleChange('startTime') || ''}
              >
                {timeSlots.map(slot => (
                  <MenuItem key={slot.id} value={JSON.stringify(slot)}>
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
                onChange={this.handleChange('endTime') || ''}
              >
                {timeSlots.map(slot => (
                  <MenuItem key={slot.id} value={JSON.stringify(slot)}>
                    {slot.end}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={classes.actionContainer}>
              <Button
                className={classes.nextButton}
                variant='contained'
                color='primary'
                disabled={this.checkStep()}
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
