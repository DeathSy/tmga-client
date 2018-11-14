import React from 'react'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Chip,
  Button
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  chips: {
    margin: theme.spacing.unit / 4
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  actionContainer: {
    marginTop: theme.spacing.unit * 2
  }
})
const data = [
  {
    lecturer: 'Dr.Umaporn',
    subject: '',
    day: [{ name: 'MON' }, { name: 'TUE' }],
    room: '',
    start: '13:00',
    end: '16:00',
    required: false
  },
  {
    lecturer: '',
    subject: 'INT101',
    day: [{ name: 'MON' }],
    room: 'CB2301',
    start: '9:00',
    end: '12:00',
    required: true
  },
  {
    lecturer: 'Dr.Praisan',
    subject: '',
    day: [{ name: 'WED' }, { name: 'THU' }, { name: 'FRI' }],
    room: '',
    start: '13:00',
    end: '16:00',
    required: true
  }
]
export class Constraints extends React.Component {
  _onClick = () => {
    this.props.onClick()
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lecturer Name </TableCell>
              <TableCell>Subject Name </TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>End time</TableCell>
              <TableCell>Required</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{d.lecturer}</TableCell>
                <TableCell>{d.subject}</TableCell>
                <TableCell>
                  {' '}
                  {d.day.map((dayname, index) => (
                    <Chip className={classes.chips} label={dayname.name} />
                  ))}
                </TableCell>
                <TableCell>{d.room}</TableCell>
                <TableCell>{d.start}</TableCell>
                <TableCell>{d.end}</TableCell>
                <TableCell>
                  {d.required === true ? <DoneIcon /> : <ClearIcon />}
                </TableCell>
                <TableCell>
                  <Button size='small'>
                    <EditIcon className={classes.icon} />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.actionContainer}>
          <Button variant='contained' color='primary' onClick={this._onClick}>
            Add Constraint
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Constraints)
